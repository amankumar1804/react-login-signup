import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../Home.css'; // Import CSS file for styling

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const url = `http://localhost:8080/products/${productId}`;
            const headers = {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            if (response.ok) {
                handleSuccess('Product deleted successfully');
                fetchProducts(); // Refresh the product list after deletion
            } else {
                const error = await response.json();
                handleError(error.message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="home-container">
            <div className="user-info">
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="user-details-container">
                <h2>User Details:</h2>
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Action</th> {/* New column for delete button */}
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.Dob}</td>
                                    <td>
                                        {/* Ensure correct path to your image */}
                                        <img src="/icons8-delete-button-100.png" alt="Delete" onClick={() => handleDelete(item._id)} className="delete-icon" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;



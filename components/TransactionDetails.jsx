import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const API = import.meta.env.VITE_BASE_API_URL;



const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        fetch(`${API}/transactions/${id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data))
    }, []);

    const handleDelete = () => {
        console.log('Deleting...')
        fetch(`${API}/transactions/${id}`, { method: "DELETE" })
            .then(() => navigate('/'))
    }
    const { transaction_from, amount, date, category } = transaction;

    return (
        <div>
            <p>
                From: {transaction_from}
            </p>
            <p>
                Amount: {amount}
            </p>
            <p>Date: {date}</p>
            <p>Category: {category}</p>
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>
        </div>

    )
}

export default TransactionDetails
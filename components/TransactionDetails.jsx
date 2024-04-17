import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const API = import.meta.env.VITE_BASE_API_URL;



const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({});
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
    const { pending, transaction_from, amount, date, category, transaction_id, account, recurring, memo } = transaction;

    return (
        <div>
            <p>{pending ? "Pending" : "Posted"} {date}</p>
            <table>
                <tbody>
                    <tr>
                        <th>{transaction_from}</th>
                        <th>{amount}</th>
                    </tr>
                    <tr>
                        <td>{transaction_id}</td>
                        <td>{account}</td>
                    </tr>
                    <tr>
                        <td>{category}</td>
                        <td>{recurring ? "Automatic" : "One-time"}</td>
                    </tr>
                </tbody>
            </table>
            <p>Memo: {memo}</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to="/edit" state={{ transaction }}>Edit</Link>
        </div>

    )
}

export default TransactionDetails
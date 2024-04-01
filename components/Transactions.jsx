import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_API_URL;
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetch(`${API}/transactions`)
            .then((res) => res.json())
            .then((data) => setTransactions(data))
    }, [])
    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transaction) => {
                    const { id, transaction_from, amount, date } = transaction;
                    return (
                        <Link to={`/${id}`} >
                            <li key={id}>
                                <p>From: {transaction_from}</p>
                                <p>Amount: {amount}</p>
                                <p>Date: {date}</p>
                            </li>
                        </Link>
                    );
                })}
            </ul>


        </div>
    )
}

export default Transactions
import React, { useEffect, useState } from 'react'
import TransactionListItem from './TransactionListItem';

const API = import.meta.env.VITE_BASE_API_URL;
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetch(`${API}/transactions`)
            .then((res) => res.json())
            .then((data) => setTransactions(data))
    }, [])

    const calculateTotal = () => {
        return transactions && transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    }
    const totalTextColor = () => {
        return calculateTotal() > 1000 ? 'green' : calculateTotal() > 100 ? 'yellow' : 'red';
    }

    return (
        <div>
            <h1>Transactions</h1>
            <h2>Current Total: <span style={{ color: totalTextColor() }}>${calculateTotal()}</span></h2>
            <ul>
                {transactions.map((transaction) => {
                    const currentTransaction = { ...transaction };
                    return <TransactionListItem key={transaction.id} transaction={transaction} />;
                })}
            </ul>
        </div>
    )
}

export default Transactions
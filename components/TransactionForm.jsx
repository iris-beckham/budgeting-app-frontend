import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
const API = import.meta.env.VITE_BASE_API_URL;

const TransactionForm = () => {
    let transaction;
    if (useLocation().state) {
        transaction = useLocation().state.transaction;
    }
    const navigate = useNavigate();
    const [newTransaction, setNewTransaction] = useState(transaction || {
        amount: "",
        date: "",
        transaction_from: "",
        category: "",
        memo: "",
        pending: false,
        account: "",
        recurring: false
    });
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        fetch(`${API}/transactions`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
                let allCategories = {};
                let allAccounts = {};
                data.forEach(transaction => {
                    allCategories[transaction.category] = '';
                    allAccounts[transaction.account] = '';
                })
                setCategories(Object.keys(allCategories).filter(category => /\S/.test(category)));
                setAccounts(Object.keys(allAccounts).filter(account => /\S/.test(account)));
            })
    }, [])


    const addTransaction = () => {
        fetch(`${API}/transactions`, {
            method: "POST",
            body: JSON.stringify(newTransaction),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((data) => { navigate(`/${data.id}`) })
            .catch((error) => console.error("catch", error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTransaction();
    };

    const handleTextChange = (event) => {
        console.log([event.target.id], ':', event.target.value)
        setNewTransaction({ ...newTransaction, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.id]: e.target.checked });
    };

    const { amount, date, transaction_from, category, memo, pending, account, recurring } = newTransaction;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="transaction_from">
                From
                <input
                    type="text"
                    id="transaction_from"
                    value={transaction_from}
                    onChange={handleTextChange}
                    required />
            </label>
            <label htmlFor="amount">
                Amount
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleTextChange}
                    required />
            </label>
            <label htmlFor="date">
                Date
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleTextChange}
                    required />
            </label>
            <label htmlFor="category">
                Category
                <input type="text" list="category" />
                <datalist
                    value={category}
                    id="category"
                    onChange={handleTextChange}>
                    {(categories).map((category) => {
                        return <option key={category} value={category}>{category}</option>
                    })}
                </datalist>
            </label>
            <br />
            <label htmlFor="pending">
                Pending
                <input
                    type="checkbox"
                    id='pending'
                    checked={pending}
                    onChange={handleCheckboxChange} />
            </label>
            <label htmlFor="recurring">
                Automatic Payment
                <input
                    type="checkbox"
                    id='recurring'
                    value={recurring}
                    onChange={handleCheckboxChange} />
            </label>
            <label htmlFor="account">
                Account
                <input
                    type="text"
                    list="account" />
                <datalist
                    value={account}
                    id="account"
                    onChange={handleTextChange}>
                    {(accounts).map((account) => {
                        return <option key={account} value={account}>{account}</option>
                    })}
                </datalist>
            </label>
            <label htmlFor="memo">
                Memo
                <textarea
                    id="memo"
                    value={memo}
                    onChange={handleTextChange}></textarea>
            </label>

            <br />
            <input type="submit" />

        </form>
    )
}

export default TransactionForm
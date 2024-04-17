import { Link } from 'react-router-dom';

const TransactionListItem = (transaction) => {
    const { id, transaction_from, amount, date, pending } = transaction.transaction;
    return (
        <Link to={`/${id}`} >
            <li >
                <p>From: {transaction_from}</p>
                <p>Amount: {amount}</p>
                <p>Date: {date}</p>
                <p>{pending ? "Pending" : "Posted"}</p>
            </li>
            <hr />
        </Link>
    )
}

export default TransactionListItem
import React from 'react'

const TransactionForm = () => {
    return (
        <form action="">
            <label htmlFor="">
                From
                <input type="text" />
            </label>
            <label htmlFor="">
                Amount
                <input type="number" defaultValue={0.00} name="" id="" />
            </label>
            <label htmlFor="">
                Date
                <input type="date" name="" id="" />
            </label>
            <label htmlFor="">
                Category
                <select name="" id="">
                    <option value="">Rent</option>
                </select>
            </label>
            <br />
            <label htmlFor="">
                Status
                <select name="" id="">
                    <option value="">Pending</option>
                    <option value="">Went through</option>
                </select>
            </label>
            <label htmlFor="">
                Memo
                <textarea name="" id="" ></textarea>
            </label>

        </form>

    )
}

export default TransactionForm
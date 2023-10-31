import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Item from '../Item/Item';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {logged, setActive, expenses, getExpenses, deleteExpense, getTotalExpensesThisMonth} = useGlobalContext()

    useEffect(() =>{
        if(!logged) setActive(7);
        getExpenses();
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>₹{getTotalExpensesThisMonth()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <Item
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={`₹${amount}`} 
                                date={date} 
                                type={"expense"}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        width: 100%;

        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
        @media screen and (max-width: 500px) {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        font-size: 2rem;
        width: 100%;
      }
    }
    .expense-content{
        display: flex;
        flex-direction: row; 
        gap: 2rem;
        @media screen and (max-width: 500px) {
            flex-direction: column;
        }
    }
    .expenses{
            flex: 1;
            width:auto;
     @media screen and (max-width: 500px) {
            width:100%;
            font-size:1rem;
            padding-bottom: 10rem;
    } 
        }
    .form-container{
        flex: 1;
    }
`;

export default Expenses


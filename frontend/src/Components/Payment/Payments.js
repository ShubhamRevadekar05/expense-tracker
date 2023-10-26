import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import PaymentForm from './PaymentForm';

function Payments() {
    const {payments, getPayments, deletePayment} = useGlobalContext()

    useEffect(() =>{
        getPayments();
    }, [])
    return (
        <AnalysisStyled>
            <InnerLayout>
                <h1>Payments</h1>
                <div className="income-content">
                    <div className="form-container">
                        <PaymentForm />
                    </div>
                    <div className="incomes">
                        {payments.map((payment) => {
                            const {_id, title, amount, date, category, description} = payment;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deletePayment}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </AnalysisStyled>
    )
}

const AnalysisStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
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
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Payments


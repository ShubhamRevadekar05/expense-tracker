import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Item from '../Item/Item';
import PaymentForm from './PaymentForm';

function Payments() {
    const {logged, setActive, payments, getPayments, deletePayment, makePayment} = useGlobalContext()

    useEffect(() =>{
        if(!logged) setActive(7);
        getPayments();
    }, [])
    return (
        <AnalysisStyled>
            <InnerLayout>
                <h1>Payments</h1>
                <div className="payment-content">
                    <div className="form-container">
                        <PaymentForm />
                    </div>
                    <div className="incomes">
                        {payments.map((payment) => {
                            const {_id, title, amount, dueDate, category, description} = payment;
                            return <Item
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={dueDate} 
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deletePayment}
                                makePayment={makePayment}
                                type={"payment"}
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
    .payment-content{
        display: flex;
        flex-direction: row; 
        gap: 2rem;
        @media screen and (max-width: 500px) {
    flex-direction: column; /* Switch to vertical on smaller screens */
}

        .incomes{
            flex: 1;
        }
    }
    .form-container{
        flex: 1;
    }
`;

export default Payments


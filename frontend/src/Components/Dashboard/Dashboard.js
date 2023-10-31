import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { Chart } from 'chart.js/auto';
import {NotificationManager} from 'react-notifications';
import { dateFormat } from "../../utils/dateFormat";

function Dashboard() {
    const { logged, setActive, expenses, getExpenses, getTotalExpensesThisMonth, getTotalYearlyMonthWiseExpense, payments, getPayments, getBudgets } = useGlobalContext()
    const [dashBoardChart, setDashBoardChart] = useState(null);
    
    useEffect(() => {
        if(!logged) setActive(7);
        getExpenses();
        getPayments();
        getBudgets();
    }, []);

    useEffect(() => {
        let paymentReminder = setInterval(() => {
          payments.forEach(element => {
              if(new Date(element.dueDate) <= new Date()) {
                  NotificationManager.warning("", `Your payment ${element.title} is due on ${dateFormat(element.dueDate)}`);
              }
          });
        }, [120000])
        return () => clearInterval(paymentReminder);
      }, [payments]);

    useEffect(() => {
        if(dashBoardChart) dashBoardChart.destroy();
        setDashBoardChart(new Chart(document.getElementById("dashBoardChart"), {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Monthly Expense",
                    data: getTotalYearlyMonthWiseExpense(),
                    tension: 0.1
                }],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Monthly Expense Distribution"
                    }
                }
            }
        }));
let min = Math.min(...expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        }).map(item => item.amount));
        let max = Math.max(...expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        }).map(item => item.amount))
        document.getElementById("minExpense").innerText = `₹ ${min === Infinity ? 0 : min}`;
        document.getElementById("maxExpense").innerHTML = `₹ ${max === -Infinity ? 0 : max}`;
    }, [expenses]);

    return (
        
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <canvas id="dashBoardChart" />
    
                        <h2 className="total-expense">Total Expense: <span>₹{getTotalExpensesThisMonth()}</span></h2>
                    </div>
                    <div className="history-con">
                        <History title={"Recent History"} list={expenses.slice(0, 3)}/>
                        <h2 className="expense-title">Min<span>Expenses</span>Max</h2>
                        <div className="expense-item">
                            <p id="minExpense"></p>
                            <p id="maxExpense"></p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    width:100%;
    .stats-con {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        @media screen and (max-width: 480px){
             flex-direction: column;
       }
        
        .chart-con {
            flex: 1;
           // height: 400px;
            //width: 300px;
            //flex-basis: 75%; /* Adjust as needed */
                -webkit-flex-basis: 40%;
            @media screen and (max-width: 500px) {
                //-webkit-flex-basis: 40%;
                height: 500px;
                //max-height: auto;
                margin-right: 0;
                }
            .amount-con {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                margin-top: 2rem;

            @media screen and (max-width: 500px) {
                height: auto; // Set height to 'auto' for small screens
                 grid-column: unset;
                 width: none;
                }
            }
        }
        
        .history-con {
            flex: 1;
            //padding-left: 3rem;

        @media screen and (max-width: 500px) {
                margin-top: 2rem;
                margin-left: 0; 
                }

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .expense-title {
                font-size: 1.2rem;
                
                span {
                    font-size: 1.8rem;
                }
            }
            
            .expense-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
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
`;

export default Dashboard;

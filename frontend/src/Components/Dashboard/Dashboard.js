import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { Chart } from 'chart.js/auto';
import {NotificationManager} from 'react-notifications';
import { dateFormat } from "../../utils/dateFormat";

// import Chart from '../Chart/Chart';

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
        }, [10000])
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
        document.getElementById("minExpense").innerText = min === Infinity ? 0 : min;
        document.getElementById("maxExpense").innerHTML = max === -Infinity ? 0 : max;
    }, [expenses]);

    return (
        
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <canvas id="dashBoardChart" />
                        <div className="amount-con">
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {getTotalExpensesThisMonth()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History title={"Recent History"} list={expenses.slice(0, 3)} />
                        <h2 className="salary-title">Min<span>Expenses</span>Max</h2>
                        <div className="salary-item">
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
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard
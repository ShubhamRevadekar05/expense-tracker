import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { Chart } from 'chart.js/auto';

function Analysis() {
    const {logged, setActive, expenses, payments, budgets, getTotalExpensesThisMonth, getNumberOfExpensesThisMonth, getCategories, getTotalMonthlyCategoryWiseExpense, getBudgetByCategory} = useGlobalContext()
    const [categories, setCategories] = useState(getCategories());
    const [totalMonthlyCategoryWiseExpense, setTotalMonthlyCategoryWiseExpense] = useState(getTotalMonthlyCategoryWiseExpense());
    const [aCWChart, setACWChart] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Overall");
    const [aBChart, setABChart] = useState(null);

    useEffect(() =>{
        if(!logged) setActive(7);
    }, []);
    useEffect(() => {
        if(aCWChart) aCWChart.destroy();
        setACWChart(new Chart(document.getElementById("aCWChart"), {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    label: "Monthly Category-wise Expense Distribution",
                    data: totalMonthlyCategoryWiseExpense
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Monthly Category-wise Expense Distribution"
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
    }, [expenses, payments, budgets]);

    useEffect(() => {
        if(aBChart) aBChart.destroy();
        let budget = getBudgetByCategory(selectedCategory);
        let totalExpenseByCategory = totalMonthlyCategoryWiseExpense[categories.findIndex(element => element === selectedCategory)];
        setABChart(new Chart(document.getElementById("aBChart"), {
            type: "bar",
            data: {
                labels: [""],
                datasets: [{
                    label: "Used",
                    data: [totalExpenseByCategory]
                },{
                    label: "Un-used",
                    data: [budget.amount - totalExpenseByCategory]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Category-wise Budget Distribution"
                    }
                }
            }
        }));
    }, [selectedCategory]);
    return (
        <AnalysisStyled>
            <InnerLayout>
                <h1>Monthly Analysis</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <canvas id="aCWChart" width="40%" height="30%" />
                        
                    </div>
                    <div className="history-con">
                        <h2 className="salary-title">Min<span>Expenses</span>Max</h2>
                        <div className="salary-item">
                            <p id="minExpense"></p>
                            <p id="maxExpense"></p>
                        </div>
                        <h2 className="salary-title">Total Expenses<span></span>Number of Transactions</h2>
                        <div className="salary-item">
                            <p>{getTotalExpensesThisMonth()}</p>
                            <p>{getNumberOfExpensesThisMonth()}</p>
                        </div>
                    </div>
                </div>
                <br/>
                <hr />
                <br/>
                <h1>Budget Analysis</h1>
                <div className="stats-con">
                    <div className="dropDownList">
                        <select onChange={e => setSelectedCategory(e.target.value)}>
                            <option value="Overall">Overall</option>
                            {categories.map(element => {
                                return <option value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div className="chart-con">
                        <canvas id="aBChart" width="40%" height="30%" />
                    </div>
                    
                </div>
            </InnerLayout>
        </AnalysisStyled>
    )
}

const AnalysisStyled = styled.div`
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

    .dropDownList{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
        input{
            width: 100%;
        }
    }
}
`;

export default Analysis


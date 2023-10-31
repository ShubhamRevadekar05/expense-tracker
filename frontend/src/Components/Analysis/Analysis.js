import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { Chart } from 'chart.js/auto';
import History from '../../History/History';

function Analysis() {
    const {logged, setActive, expenses, payments, budgets, getTotalExpensesThisMonth, getNumberOfExpensesThisMonth, getCategories, getTotalMonthlyCategoryWiseExpense, getBudgetByCategory} = useGlobalContext()
    const [categories, setCategories] = useState(getCategories());
    const [totalMonthlyCategoryWiseExpense, setTotalMonthlyCategoryWiseExpense] = useState(getTotalMonthlyCategoryWiseExpense());
    const [exceedingBudgets, setExceedingBudgets] = useState([]);
    const [aCWChart, setACWChart] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Overall");
    const [aBChart, setABChart] = useState(null);

    useEffect(() =>{
        if(!logged) setActive(7);
        Chart.defaults.font.size = 16;
        Chart.defaults.height = 5;
    }, []);
    useEffect(() => {
        //Plotting Monthly Analysis Chart
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
                },
            height: 10, // Set the height to the desired value
            width: 10,
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
        document.getElementById( "minExpense").innerText = `₹ ${min === Infinity ? 0 : min}`;
        document.getElementById("maxExpense").innerHTML = `₹ ${max === -Infinity ? 0 : max}`;

        //Calculate Exceeding Budgets
        setExceedingBudgets(budgets.map(element => {
            let category = element.category;
            let budget = getBudgetByCategory(element.category);
            let totalExpenseByCategory = category !== "Overall" ? totalMonthlyCategoryWiseExpense[categories.findIndex(element => element === category)] : getTotalExpensesThisMonth();
            return budget.amount ? {title: element.category, amount: budget.amount - totalExpenseByCategory} : {title: element.category, amount: 0};
        }).filter(element => element.amount < 0));
    }, [expenses, payments, budgets]);

    useEffect(() => {
        //Plotting Budget Analysis Chart
        if(aBChart) aBChart.destroy();
        let budget = getBudgetByCategory(selectedCategory);
        let totalExpenseByCategory = selectedCategory !== "Overall" ? totalMonthlyCategoryWiseExpense[categories.findIndex(element => element === selectedCategory)] : getTotalExpensesThisMonth();
        setABChart(new Chart(document.getElementById("aBChart"), {
            type: "bar",
            data: {
                labels: [""],
                datasets: [{
                    label: "Used",
                    data: [totalExpenseByCategory]
                },{
                    label: budget.amount - totalExpenseByCategory < 0 ? "Exceed" : "Un-used",
                    data: [budget.amount ? budget.amount - totalExpenseByCategory : 0]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Category-wise Budget Distribution"
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
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
                        <canvas id="aCWChart" />
                        
                    </div>
                    <div className="history-con">
                        <h2 className="expense-title">Min<span>Expenses</span>Max</h2>
                        <div className="expense-item">
                            <p id="minExpense">&#8377;</p>
                            <p id="maxExpense">₹ </p>
                        </div>
                        <h2 className="expense-title">Total Expenses<span></span>Number of Transactions</h2>
                        <div className="expense-item">
                            <p>₹{getTotalExpensesThisMonth()}</p>
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
                    <div className="history-con">
                        {exceedingBudgets.length ?
                            <History title={"Exceeding Budgets"} list={exceedingBudgets} budgetStyled={true} />
                        :
                            <h2>Budget looks Good!</h2>
                        }

                    </div>
                </div>
            </InnerLayout>
        </AnalysisStyled>
    )
}

const AnalysisStyled = styled.div`
 width:100%;
    .stats-con {
        
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        //gap: 2rem;
        @media screen and (max-width: 500px){
             flex-direction: column;
       }
        
        .chart-con {
            flex: 1;
            gap:3rem;
            font-size:100rem;
           // height: 400px;
            //width: 300px;
            //flex-basis: 75%; /* Adjust as needed */
                -webkit-flex-basis: 5%;
            @media screen and (max-width: 500px) {
                -webkit-flex-basis: 30%;
                height: 50%;
                max-height: auto;
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

        @media screen and (max-width: 500px) {
                margin-top: 2rem;
                margin-right: 0; 
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
`;

export default Analysis


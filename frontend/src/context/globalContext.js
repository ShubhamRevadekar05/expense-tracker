import React, { useContext, useState } from "react"
import {NotificationManager} from 'react-notifications';
import axios from 'axios'

const BASE_URL = "/api/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [active, setActive] = useState(1);
    const [logged, setLogged] = useState(localStorage.getItem("logged") ? true : false);
    const [expenses, setExpenses] = useState([]);
    const [payments, setPayments] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [error, setError] = useState(null);

    const addExpense = async (expense) => {
        if(expense.category === "Other") expense.category = expense.otherCategory;
        await axios.post(`${BASE_URL}add-expense`, expense, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).then(res => {
            NotificationManager.success("", "Expense Added")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getExpenses();
        checkBudget(expense.category, expense.amount);
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setExpenses(response.data)
        //console.log(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            NotificationManager.error("", "Expense Deleted")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getExpenses()
    }

    const addPayment = async (payment) => {
        if(payment.category === "Other") payment.category = payment.otherCategory;
        await axios.post(`${BASE_URL}add-payment`, payment, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            NotificationManager.success("", "Payment Added")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getPayments()
    }

    const getPayments = async () => {
        const response = await axios.get(`${BASE_URL}get-payments`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setPayments(response.data)
        //console.log(response.data)
    }

    const deletePayment = async (id) => {
        await axios.delete(`${BASE_URL}delete-payment/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            NotificationManager.error("", "Payment Deleted")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getPayments()
    }

    const makePayment = async (id) => {
        await axios.post(`${BASE_URL}make-payment/${id}`, {}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getPayments()
    }
    
    const addBudget = async (budget) => {
        if(budget.category === "Other") budget.category = budget.otherCategory;
        await axios.post(`${BASE_URL}add-budget`, budget, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            NotificationManager.success("", "Budget Added")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getBudgets();
    }

    const getBudgets = async () => {
        const response = await axios.get(`${BASE_URL}get-budgets`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setBudgets(response.data)
        //console.log(response.data)
    }

    const deleteBudget = async (id) => {
        await axios.delete(`${BASE_URL}delete-budget/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            NotificationManager.error("", "Budget Deleted")
        })
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getBudgets();
    }

    const totalBudget = () => {
        let overallBudget = budgets.find(element => element.category === "Overall");
        if(overallBudget) {
            return overallBudget.amount;
        }
        else {
            let totalBudget = 0;
            budgets.forEach(element => {
                if(element => element.category !== "Overall") totalBudget += element.amount;
            });
            return totalBudget;
        }
    }

    const register = async (userDetails) => {
        await axios.post(`${BASE_URL}register`, userDetails)
        .catch((err) =>{
            setError(err.response.data.message)
        })
        setActive(7);
    }

    const login = async (userDetails) => {
        let response = await axios.post(`${BASE_URL}login`, userDetails)
        .catch((err) =>{
            setError(err.response.data.message)
        })
        if(response.status === 200) {
            setLogged(true);
            localStorage.setItem("logged", true);
            localStorage.setItem("username", response.data["username"]);
            localStorage.setItem("email", response.data["email"]);
            localStorage.setItem("token", response.data["token"]);
            setActive(1);
            setError("");
        }
    }

    const getTotalExpensesThisMonth = () => {
        var totalExpense = 0;
        expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        }).forEach(expense => totalExpense += expense.amount)
        return totalExpense;
    }
    
    const getNumberOfExpensesThisMonth = () => {
        return expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        }).length
    }

    const getTotalYearlyMonthWiseExpense = () => {
        let thisYearsExpenses = expenses.filter(expense => new Date(expense.date).getFullYear() === new Date().getFullYear());
        let groupedExpenses = new Map();
        groupedExpenses.set(1, []);
        groupedExpenses.set(2, []);
        groupedExpenses.set(3, []);
        groupedExpenses.set(4, []);
        groupedExpenses.set(5, []);
        groupedExpenses.set(6, []);
        groupedExpenses.set(7, []);
        groupedExpenses.set(8, []);
        groupedExpenses.set(9, []);
        groupedExpenses.set(10, []);
        groupedExpenses.set(11, []);
        groupedExpenses.set(12, []);
        thisYearsExpenses.forEach(element => {
            groupedExpenses.get(new Date(element.date).getMonth()+1).push(element);
        });
        let totalYearsExpenses = [];
        groupedExpenses.forEach((value, key) => {
            let total = 0;
            value.forEach(element => {
                total += element.amount;
            });
            totalYearsExpenses.splice(key-1, 0, total);
        });
        return totalYearsExpenses;
    }

    const getPredefinedCategories = () => {
        let categories = ["Education", "Electricity", "Groceries", "Insurance", "Medicine", "Rent", "Transportation"];
        return categories;
    }

    const getCategories = () => {
        let categories = getPredefinedCategories();
        let expensesThisMonth = expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        });
        expensesThisMonth.forEach(element => {
            if(!categories.includes(element.category)) {
                categories.push(element.category);
            }
        });
        payments.forEach(element => {
            if(!categories.includes(element.category)) {
                categories.push(element.category);
            }
        });
        budgets.forEach(element => {
            if(!categories.includes(element.category) && element.category !== "Overall") {
                categories.push(element.category);
            }
        });
        return categories;
    }

    const getTotalMonthlyCategoryWiseExpense = () => {
        let groupedExpenses = new Map();
        let categories = getCategories();
        categories.forEach(element => {
            groupedExpenses.set(element, []);
        });
        let expensesThisMonth = expenses.filter(element => {
            let date1 = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            return new Date(element.date) >= date1
        });
        expensesThisMonth.forEach(element => {
            groupedExpenses.get(element.category).push(element);
        });
        let totalExpensesByCategory = [];
        groupedExpenses.forEach((value, key) => {
            let total = 0;
            value.forEach(element => {
                total += element.amount;
            });
            totalExpensesByCategory.push(total);
        });
        return totalExpensesByCategory;
    }

    const getBudgetByCategory = (category) => {
        var budget = {
            category,
            amount: 0
        }
        budgets.filter(element => element.category === category).forEach(element => {
            budget.amount += element.amount;
        });
        return budget;
    }

const checkBudget = (category, amount) => {
        let categories = getCategories();
        let budget = getBudgetByCategory(category);
        if(budget.amount !== 0) {
            let totalMonthlyCategoryWiseExpense = getTotalMonthlyCategoryWiseExpense();
            let totalExpenseByCategory = category !== "Overall" ? totalMonthlyCategoryWiseExpense[categories.findIndex(element => element === category)] : getTotalExpensesThisMonth();
            let amountDiff =  budget.amount - (parseInt(totalExpenseByCategory)+parseInt(amount));
            if(amountDiff < 1) {
                NotificationManager.warning("", `Budget for category ${category} is exceeding by ${Math.abs(amountDiff)}`);
            }
        }
    }



    return (
        <GlobalContext.Provider value={{
            active,
            setActive,
            logged,
            setLogged,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            payments,
            addPayment,
            getPayments,
            deletePayment,
            makePayment,
            budgets,
            addBudget,
            getBudgets,
            deleteBudget,
            totalBudget,
            register,
            login,
            error,
            setError,
            
            getTotalExpensesThisMonth,
            getNumberOfExpensesThisMonth,
            getTotalYearlyMonthWiseExpense,
            getPredefinedCategories,
            getCategories,
            getTotalMonthlyCategoryWiseExpense,
            getBudgetByCategory,
            checkBudget
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
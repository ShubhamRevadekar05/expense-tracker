import {dashboard, expenses, budget, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Budget",
        icon: expenses,
      
    },
    {
        id: 6,
        title: "Register",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Login",
        icon: expenses,
        link: "/dashboard",
    },
]
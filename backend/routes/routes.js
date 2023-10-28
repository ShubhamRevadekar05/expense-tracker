const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { register, login } = require("../controllers/user");
const { addPayment, getPayment, deletePayment, makePayment } = require("../controllers/payment");
const { addBudget, getBudget, deleteBudget } = require('../controllers/budget');

const router = require('express').Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-payment', addPayment)
    .get('/get-payments', getPayment)
    .delete('/delete-payment/:id', deletePayment)
    .post('/make-payment/:id', makePayment)
    .post('/add-budget', addBudget)
    .get('/get-budgets', getBudget)
    .delete('/delete-budget/:id', deleteBudget)

module.exports = router
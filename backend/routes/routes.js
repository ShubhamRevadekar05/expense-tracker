const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { register, login } = require("../controllers/user");
const { addPayment, getPayment, deletePayment, makePayment } = require("../controllers/payment");
const { addBudget, getBudget, deleteBudget } = require('../controllers/budget');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../app");

const multer = require("multer");
const upload = multer({ dest: '../receipts/' })

const router = require('express').Router();


router
    .get('/', async (req, res) => {console.log(jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY)); res.end()})
    .post('/register', register)
    .post('/login', login)
    .post('/add-expense', upload.single('receipt'), addExpense)
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
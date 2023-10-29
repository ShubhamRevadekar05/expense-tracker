const PaymentSchema = require("../models/PaymentModel");
const UserSchema = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../app");
const ExpenseModel = require("../models/ExpenseModel");


exports.addPayment = async (req, res) => {
    const {title, amount, category, description, dueDate}  = req.body
    if(req.headers["authorization"]) {
        try {
            var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        }
        catch(err) {
            console.error(err);
            return res.status(401).json({message: 'Unauthorized'});
        }
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const payment = PaymentSchema({
                title,
                amount,
                category,
                description,
                dueDate,
                userId: user.id
            })
        
            try {
                //validations
                if(!title || !category || !description || !dueDate){
                    return res.status(400).json({message: 'All fields are required!'})
                }
                if(amount <= 0 || !amount === 'number'){
                    return res.status(400).json({message: 'Amount must be a positive number!'})
                }
                await payment.save()
                res.status(200).json({message: 'Payment Added'})
            } catch (error) {
                res.status(500).json({message: 'Server Error'})
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }

}

exports.getPayment = async (req, res) =>{
    try {
        if(req.headers["authorization"]) {
            try {
                var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
            }
            catch(err) {
                console.error(err);
                return res.status(401).json({message: 'Unauthorized'});
            }
            let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
            if(user) {
                const payments = await PaymentSchema.find({userId: user.id}).sort({createdAt: -1})
                res.status(200).json(payments)
            }
            else {
                res.status(401).json({message: 'Unauthorized'})
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deletePayment = async (req, res) =>{
    if(req.headers["authorization"]) {
        try {
            var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        }
        catch(err) {
            console.error(err);
            return res.status(401).json({message: 'Unauthorized'});
        }
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const {id} = req.params;
            PaymentSchema.findOneAndDelete({_id: id, userId: user.id}).exec()
                .then((payment) =>{
                    res.status(200).json({message: 'Payment Deleted'})
                })
                .catch((err) =>{
                    res.status(500).json({message: 'Server Error'})
                })
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
}

exports.makePayment = async (req, res) =>{
    try {
        if(req.headers["authorization"]) {
            try {
                var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
            }
            catch(err) {
                console.error(err);
                return res.status(401).json({message: 'Unauthorized'});
            }
            let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
            if(user) {
                const {id} = req.params;
                const payment = await PaymentSchema.findById(id).exec();
                if(payment) {
                    const expense = ExpenseModel({
                        title: payment.title,
                        amount: payment.amount,
                        category: payment.category,
                        description: payment.description,
                        type: "payment",
                        date: new Date(),
                        userId: user.id,
                        paymentId: id
                    });
                    await PaymentSchema.findByIdAndUpdate(payment.id, {dueDate: new Date(payment.dueDate.setMonth(payment.dueDate.getMonth()+1))}).exec();
                    try {
                        await expense.save()
                        res.status(200).json({message: 'Expense Added'})
                    } catch (error) {
                        res.status(500).json({message: 'Server Error'})
                    }
                }
                else {
                    res.status(400).json({message: "No payment with that Id."})
                }
            
                
            }
            else {
                res.status(401).json({message: 'Unauthorized'})
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
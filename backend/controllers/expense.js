const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date} = req.body;

    const expense = new ExpenseSchema ({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required!!'})
        }
        if(amount <= 0 || !amount ==='number'){
            return res.status(400).json({message: 'Amount must be a positive number!!'})
        }
        await expense.save();
            res.status(200).json({message: 'Expense Added' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error' })
        
    }
    console.log(expense)
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error' }) 
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message: 'Expense Deleted'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Server Error'})
    })
};

/* exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Check if the income with the given id exists
        const existingExpense = await ExpenseSchema.findById(id);

        if (!existingExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Update the income fields
        existingExpense.title = title || existingExpense.title;
        existingExpense.amount = amount || existingExpense.amount;
        existingExpense.category = category || existingExpense.category;
        existingExpense.description = description || existingExpense.description;
        existingExpense.date = date || existingExpense.date;

        // Save the updated income
        await existingExpense.save();

        res.status(200).json({ message: 'Expense Updated', updatedExpense: existingExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}; */
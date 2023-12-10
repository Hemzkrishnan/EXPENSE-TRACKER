const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date} = req.body;

    const income = new IncomeSchema ({
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
        await income.save();
            res.status(200).json({message: 'Income Added' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error' })
        
    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error' }) 
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message: 'Income Deleted'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Server Error'})
    })
};

/* exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Check if the income with the given id exists
        const existingIncome = await IncomeSchema.findById(id);

        if (!existingIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Update the income fields
        existingIncome.title = title || existingIncome.title;
        existingIncome.amount = amount || existingIncome.amount;
        existingIncome.category = category || existingIncome.category;
        existingIncome.description = description || existingIncome.description;
        existingIncome.date = date || existingIncome.date;

        // Save the updated income
        await existingIncome.save();

        res.status(200).json({ message: 'Income Updated', updatedIncome: existingIncome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}; */
const db = require("../utils/database");


exports.getBudgets = async (req, res, next) => {
    const query = 'SELECT * FROM budgets;';
    const budgets = await db.query(query);
    try {
        if(budgets.rowCount < 1) {
            return res.status(404).send({
                message: 'No Budgets Found'
            })
        }
    
        return res.status(200).send({
            status: 'Success',
            message: 'Budgets Retrieved Successfully...',
            data: budgets.rows
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }

};

// Get Budget by Id
exports.getBudgetById = async (req, res, next) => {
    const { id } = req.params;
    const query = 'SELECT * FROM budgets WHERE id=$1;';
    try {
        const budget = await db.query(query, [id]);
        if(budget.rowCount < 1) {
            return res.status(404).send({
                message: 'No Budget Found'
            })
        }
        return res.status(200).send({
            status: 'Success',
            message: 'Budget Retrieved Successfully...',
            data: budget.rows
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};


// Add Budget
exports.addBudget = async (req, res, next) => {
    const {
        amount,
        start_date,
        end_date,
        user_id,
        category_id
    } = req.body;
    
    const query = 'INSERT INTO budgets (amount, start_date, end_date, user_id, category_id) VALUES ($1, $2, $3, $4, $5);';
    try {
        await db.query(query, [amount, start_date, end_date, user_id, category_id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Budget Created...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};


// Update Budget by Id
exports.updateBudgetById = async (req, res, next) => {
    const { id } = req.params;
    const {
        amount,
        start_date,
        end_date,
        category_id
    } = req.body;
    const query = 'UPDATE budgets SET amount=$1, start_date=$2, end_date=$3, category_id=$4 WHERE id=$5;';
    try {
        await db.query(query, [amount, start_date, end_date, category_id, id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Budget Updated...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
   
};


// Delete Budget by Id
exports.deleteBudgetById = async (req, res, next) => {
    const { id } = req.params;
    const query = 'DELETE FROM budgets WHERE id=$1;';
    try {
        await db.query(query, [id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Budget Deleted...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};
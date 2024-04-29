const db = require("../utils/database")




// get Categories
exports.getCategories = async (req, res, next) => {
    const query = 'SELECT * FROM categories;'
    try {
        const categories = await db.query(query);
        if(categories.rowCount < 1) {
            return res.status(404).send({
                message: 'No Categories Found!'
            })
        }
        return res.status(200).send({
            status: 'Success',
            message: 'Categories Retrieved Successfully...',
            data: categories.rows
        })
    } catch(err) {
        res.status(500).send({
            error: err.message
        })
    }
}



// get Category by Id
exports.getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    const query = 'SELECT * FROM categories WHERE id=$1;';
    try {
        const category = await db.query(query, [id]);
        if(category.rowCount < 1) {
            return res.status(404).send({
                message: 'No Category Found!'
            })
        }
        return res.status(200).send({
            status: 'Success',
            message: 'Category Retrieved Successfully...',
            data: category.rows
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};

// Get Category Budget
exports.getCategoryBudgetById = async (req, res, next) => {
    const { id } = req.params;
    const query = 'SELECT categories.id, categories.name, categories.description, budgets.amount, budgets.start_date, budgets.end_date FROM categories INNER JOIN budgets ON categories.id = budgets.category_id WHERE categories.id = $1'
    try {
        const category = await db.query(query, [id]);
        if(category.rowCount < 1) {
            return res.status(404).send({
                message: 'No Category Budget Found!'
            });
        }
        return res.status(200).send({
            status : 'Success',
            message: 'Category Budget Retreived...',
            data: category.rows
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};


// Add Category
exports.addCategory = async (req, res, next) => {
    const { name, description, user_id } = req.body;
    const query = 'INSERT INTO categories (name, description, user_id) VALUES ($1, $2, $3);';

    try {
        await db.query(query, [name, description, user_id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Category Created Successfully...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
}

// Update Category By id
exports.updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE categories SET name=$1, description=$2 WHERE id=$3;';
    try {
        await db.query(query, [name, description, id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Category Updated...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
}; 

// Delete category by id 
exports.deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    const query = 'DELETE FROM categories WHERE id=$1;';
    try {
        await db.query(query, [id]);
        return res.status(200).send({
            status: 'Success',
            message: 'Category Deleted Successfully...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }

}

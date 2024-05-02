const db = require('../utils/database');


exports.login = async (req, res, next) => {
    const query = 'SELECT * FROM users WHERE id=$1;';
    try {
        const user = await db.query(query, [1]);
        req.session.user = user.rows;
        res.redirect('/');
    } catch(err) {
        return res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        })
    }
}
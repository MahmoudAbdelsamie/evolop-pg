const db = require("./database")

exports.testDBConnection = () => {
    return db.query('SELECT NOW()')
}
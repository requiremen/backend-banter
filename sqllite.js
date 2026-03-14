import {DatabaseSync} from 'node:sqlite';
//The path of the database. A SQLite database can be stored in a file or completely in memory. 
// To use a file-backed database, the path should be a file path. To use an in-memory database, 
// the path should be the special name ':memory:'.
const db = new DatabaseSync(':memory:')
db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
    )
    `)
db.exec(`
    CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    tasks TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)

    )
    `)
export default db

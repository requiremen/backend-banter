//? in VALUES (?, ?)

//The ? is a placeholder for values that will be inserted later.

//It is used in prepared statements to prevent SQL injection and safely pass variables.

const insertuser = db.prepare(`INSERT INTO users (username,password) VALUES(?, ?)`)

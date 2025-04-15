const db = require('../config/db');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    res.json({ id: user.id, username: user.username, role: user.role });
  });
};

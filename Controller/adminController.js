const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'fee146ea4d2f12213f02153ac0b4400270662eb7cb47b408522e6d7835c65995ceae96a743f210debacbd4ed4d1815ba70e49694d4da3066f5bc74aab8570257'; // Replace with a secure secret key

// Predefined admin credentials
const ADMIN_USERNAME = 'adminvasudev';
const ADMIN_PASSWORD = bcrypt.hashSync('Vasudev@123', 10); // Prehashed password

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Verify credentials
    if (username !== ADMIN_USERNAME || !(await bcrypt.compare(password, ADMIN_PASSWORD))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Middleware to protect routes
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // Attach admin info to the request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

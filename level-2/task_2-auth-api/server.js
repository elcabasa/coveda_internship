const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authToken, authorizedRole, secretKey } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

let users = [];
let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Tablet', price: 300 },
    { id: 4, name: 'Mouse', price: 100 },
    { id: 5, name: 'Keyboard', price: 200 }
];

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
};

// ==================== AUTH ROUTES ====================

app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            email,
            password: hashedPassword,
            role: role === 'admin' ? 'admin' : 'user'
        };

        users.push(newUser);
        return res.status(201).json({
            message: 'User registered successfully!',
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during signup' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error during login' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token', cookieOptions);
    return res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', authToken, (req, res) => {
    return res.status(200).json({ user: req.user });
});

// ==================== PRODUCT ROUTES ====================

app.get('/api/products', (req, res) => {
    return res.status(200).json(products);
});

app.get('/api/products/:id', authToken, (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
});

app.post('/api/products', authToken, authorizedRole('admin'), (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const newProduct = {
            id: products.length + 1,
            name,
            price: Number(price)
        };

        products.push(newProduct);
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is actively running on port ${PORT}`);
});

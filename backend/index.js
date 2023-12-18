import express from "express"
import mysql from "mysql"
import jwt from "jsonwebtoken"
import cors from 'cors'

const app = express()
const secretKey = 'secretkey'
const refreshTokenSecret = 'refreshSecretkey';
const port = 8800

const tokenBlacklist = []
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json()); // Otherwise express could not read request body

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: "feyverly"
})

const users = [
    {
        id: '1',
        username: 'admin',
        password: '1234'
    }
]

app.get("/", (req, res) => {
    res.json("Hello from backend")
})

app.get('/test', (req, res) => {
    const q = "SELECT * FROM `feyverly`.`shop`;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.sendStatus(401);
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '30m', // Token expiration time
    });
    
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, refreshTokenSecret);

    res.json({ accessToken, refreshToken  });
});

// Logout route
app.post('/logout', (req, res) => {
    const token = req.header('Authorization');

    if (token) {
        tokenBlacklist.push(token);
    }

    res.sendStatus(200);
});

// Refresh token route
// 
// PS. Did not add function to request this route on React yet
app.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
  
    if (!refreshToken || tokenBlacklist.includes(refreshToken)) {
      return res.sendStatus(401);
    }
  
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      const newAccessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '30m',
      });
  
      res.json({ accessToken: newAccessToken });
    });
  });

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
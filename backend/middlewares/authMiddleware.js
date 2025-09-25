const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add the user payload to the request
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
```

#### D. Environment Variables (`.env` file)

For security, you must never hardcode sensitive information like your MongoDB connection string or your JWT secret key. Create a `.env` file in the root of your backend project.

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_very_secret_and_long_string

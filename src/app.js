const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

// Enhanced welcome endpoint with build info
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Optimized CI/CD Demo!',
        version: '2.0.0',
        environment: NODE_ENV,
        buildInfo: {
            timestamp: process.env.BUILD_TIME || new Date().toISOString(),
            commit: process.env.GITHUB_SHA || 'local',
            cached: process.env.CACHE_HIT || 'unknown'
        }
    });
});

// Enhanced health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV,
        nodeVersion: process.version
    });
});

// Performance endpoint
app.get('/api/performance', (req, res) => {
    res.json({
        environment: NODE_ENV,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        loadAverage: process.platform === 'linux' ? require('os').loadavg() : [0, 0, 0]
    });
});

// Original endpoints
app.get('/api/hello', (req, res) => {
    res.json({ 
        greeting: 'Hello from Optimized CI/CD Pipeline!',
        success: true,
        environment: NODE_ENV
    });
});

// Error handling
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Start server
if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌍 Environment: ${NODE_ENV}`);
    });
}

module.exports = app;
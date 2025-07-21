const request = require('supertest');
const app = require('../src/app');

describe('Optimized App Tests', () => {
    
    test('Welcome page should return enhanced info', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to Optimized CI/CD Demo!');
        expect(response.body.version).toBe('2.0.0');
        expect(response.body.buildInfo).toBeDefined();
    });

    test('Health check should return detailed metrics', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('healthy');
        expect(response.body.uptime).toBeGreaterThanOrEqual(0);
        expect(response.body.nodeVersion).toBeDefined();
    });

    test('Performance endpoint should work', async () => {
        const response = await request(app).get('/api/performance');
        expect(response.status).toBe(200);
        expect(response.body.memoryUsage).toBeDefined();
        expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });

    test('API endpoint should work', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.environment).toBeDefined();
    });

    test('Should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Route not found');
    });
});
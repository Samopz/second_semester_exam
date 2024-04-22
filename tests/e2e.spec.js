import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/index';

describe('User API Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
                password: 'password',
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    }
    );
    it('should log in a user', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'john@gmail.com',
                password: 'password',
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }
    );
}
);

describe('Blog API Endpoints', () => {
    it('should create a new blog', async () => {
        const { res } = await request(app)
            .post('/blogs')
            .send({
                title: 'Test Blog',
                content: 'This is a test blog',
            });
        // Rest of the test code...
    });
});

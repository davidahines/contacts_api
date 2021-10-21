const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
test('it should get a contact', async done => {
    const response = await request.get('/contacts/6171f0da78c9d734a3e37bb9')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done();
});
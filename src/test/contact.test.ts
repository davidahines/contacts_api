import contactModel from "../models/contactModel";
import IAddress from "../models/interfaces/IAddress";
import IContact from "../models/interfaces/IContact";

const app = require('../../server') // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
jest.setTimeout(100000);
test('it should create a contact', async done => {
    // const testContact: IContact = <IContact> {
    //     name: "test name",
    //     email: "test@test.com",
    //     phoneNumber: "555-555-5555",
    //     address: <IAddress>{
    //         streetName: "Test Street",
    //         houseNumber: "123",
    //         city: "Test City",
    //         state: "Test State/Province"
    //     }
    // }

    const testContact = {
        name: "test name",
        email: "test@test.com",
        phoneNumber: "555-555-5555",
        address: {
            streetName: "Test Street",
            houseNumber: "123",
            city: "Test City",
            state: "Test State/Province"
        }
    }
    const response = await request.post('/contacts').send(testContact);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
    done();
});
test('it should get a contact', async done => {
    const response = await request.get('/contacts/6171f0da78c9d734a3e37bb9');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
    done();
});
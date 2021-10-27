import IContact from '../models/interfaces/IContact';
import supertest, { Response } from 'supertest';
import app from '../../server';
import TestContactModel from '../models/contactModel';
import { closeMongoose} from '../../server';

const request = supertest(app);


beforeAll(done => {
    done()
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    closeMongoose();
    done();
})
// -- TestData
const testContactJson = {
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
const testContact: IContact = new TestContactModel(testContactJson);

/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
const compareResponseToContact = (response: Response, contact: IContact) => {
    expect(response.body.name).toBe(contact.name);
    expect(response.body.email).toBe(contact.email);
    expect(response.body.phoneNumber).toBe(contact.phoneNumber);
    expect(response.body.address.city).toBe(contact.address.city);
    expect(response.body.address.houseNumber).toBe(contact.address.houseNumber);
    expect(response.body.address.state).toBe(contact.address.state);
    expect(response.body.address.streetName).toBe(contact.address.streetName);
}
jest.setTimeout(100000);


//-- /contacts Jest tests
test("it should create a contact", async () => {
    const response = await request.post('/contacts').send(testContactJson);
    expect(response.status).toBe(200);
    compareResponseToContact(response, testContact);
})
test('it should get a contact', async () => {
    const postResponse: Response = await request.post('/contacts').send(testContactJson);
    compareResponseToContact(postResponse, testContact);

    const getResponse = await request.get(`/contacts/${postResponse.body._id}`);
    expect(getResponse.status).toBe(200);
    compareResponseToContact(getResponse, testContact);
});
/* eslint-enable  @typescript-eslint/no-unsafe-member-access */
import IContact from '../models/interfaces/IContact';
import supertest, { Response } from 'supertest';
import app from '../../server';
import TestContactModel from '../models/contactModel';
import { closeMongoose, clearTestDb} from '../../server';


const request = supertest(app);


beforeAll(done => {
    clearTestDb();
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

const updateCheckJson = {
    name: "altered test name",
    email: "alteredtest@test.com",
    phoneNumber: "altered 555-555-5555",
    address: {
        streetName: "Altered Street",
        houseNumber: "Altered Number",
        city: "Altered City",
        state: "Altered State/Province"
    }
}


const testContact: IContact = new TestContactModel(testContactJson);
const alteredTestContact: IContact = new TestContactModel(updateCheckJson);


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


// contacts Jest tests
test("it should create a contact", async () => {
    const response = await request.post('/contacts').send(testContactJson);
    expect(response.status).toBe(200);
    compareResponseToContact(response, testContact);
})
test('it should get a contact', async () => {
    const postResponse: Response = await request.post('/contacts').send(testContactJson);
    compareResponseToContact(postResponse, testContact);

    const getResponse: Response = await request.get(`/contacts/${String(postResponse.body._id)}`);
    expect(getResponse.status).toBe(200);
    compareResponseToContact(getResponse, testContact);
});

test('it should update a contact', async () => {
    // Make a contact
    const postResponse: Response = await request.post('/contacts').send(testContactJson);
    compareResponseToContact(postResponse, testContact);

    // Make a copy of the test data and set it to the ID we found.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonCopy = JSON.parse(JSON.stringify(updateCheckJson));
    jsonCopy._id= String(postResponse.body._id);

    // Send the updated object.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-argument
    const putResponse: Response = await request.put(`/contacts/${postResponse.body._id}`).send(jsonCopy);
    expect(putResponse.status).toBe(200);
    compareResponseToContact(putResponse, alteredTestContact);
});

test('it should delete a contact', async () => {
    // Make a contact
    const postResponse: Response = await request.post('/contacts').send(testContactJson);
    compareResponseToContact(postResponse, testContact);

    // Delete the contact
    const deleteResponse: Response = await request.delete(`/contacts/${String(postResponse.body._id)}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.deletedCount).toBe(1);
});
/* eslint-enable  @typescript-eslint/no-unsafe-member-access */
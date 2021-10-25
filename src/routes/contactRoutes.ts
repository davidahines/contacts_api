import express, { Request, Response } from "express";
import { model } from "mongoose";
import ContactController from "../controllers/contactController";
const contactsRouter = express.Router();

const contactController = new ContactController();

const base = '/contacts'

contactsRouter.post(`${base}`,
    (request, response) => {
        contactController.addAContact(request, response)
    });
contactsRouter.get(`${base}/:id`,
    (request, response) => {
        contactController.readAContact(request, response)
    });

// contactsRouter.route('/contacts')
//     .post(contactController.addAContact);
// contactsRouter.route('/contacts/:contactId')
//     .get(contactController.readAContact);
export default contactsRouter;

import express, { Request, Response } from "express";
import ContactController from "../controllers/contactController";
export const contactsRouter = express.Router();

const contactController = new ContactController();

contactsRouter.route('/contacts')
    .get(contactController.readAContact);



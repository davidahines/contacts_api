import express, { Request, Response } from "express";
import { model } from "mongoose";
import ContactController from "../controllers/contactController";
export const contactsRouter = express.Router();

const contactController = new ContactController();

contactsRouter.route('/contacts')
    .get(contactController.readAContact);


module.exports = contactsRouter;
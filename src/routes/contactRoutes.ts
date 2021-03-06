import express from "express";
import ContactController from "../controllers/contactController";
export const contactsRouter = express.Router();

const contactController = new ContactController();

contactsRouter.post("/",
    (req, res) => {
        contactController.addAContact(req, res)
    });
contactsRouter.get("/:contactId",
    (req, res) => {
        contactController.readAContact(req, res)
    });
contactsRouter.get("/",
    (req, res) => {
        contactController.listAllContacts(req, res)
    });
contactsRouter.delete("/:contactId",
    (req, res) => {
        contactController.deleteAContact(req, res)
    });
contactsRouter.put("/:contactId",
    (req, res) => {
        contactController.updateAContact(req, res)
    });

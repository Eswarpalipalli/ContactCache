import express from "express";
import {getContacts,createContact,getcontact,updateContact,deleteContact} from "../controllers/contactController.js";
import vadidateToken from "../middleware/validateToken.js";
const router = express.Router();

router.use(vadidateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getcontact).put(updateContact).delete(deleteContact);


export default router;
import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
// @GET all contacts

const getContacts = asyncHandler (async (req,res)=>{
    const contacts = await Contact.find({user_id : req.user.id}); 
    res.status(200).json(contacts);
});

// @POST

const createContact = asyncHandler(async (req,res)=>{
    const {name,phone,email} = req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("No field should be empty!!");
    }
    const contact = await Contact.create({
        name,
        phone,
        email,
        user_id : req.user.id,
    });
    res.status(201).json(contact);
});

// @GET a contact

const getcontact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    res.status(200).json(contact);
});

//@ PUT

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Had no permission to update other user contacts!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(201).json(updatedContact);
});

//@ DELETE

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Had no permission to update other user contacts!");
    }
    res.status(200).json({ message: "Contact deleted successfully" });
});

export {getContacts,createContact,getcontact,updateContact,deleteContact};
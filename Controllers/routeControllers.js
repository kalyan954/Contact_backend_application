const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res)=>{
    console.log('Getting Contacts');
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
        const contact = await Contact.create({
            user_id: req.user.id,
            name,
            email,
            phone,
        });
        res.status(201).json(contact);
});

const getContactsById = asyncHandler(async (req, res)=>{
    try
    {
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404);
            throw new Error('Data not found');
        }
        console.log("Contact :",contact);
        res.status(200).json(contact);
    }
    catch(error)
    {
        res.status(404);
        throw new Error('Data not found');
    }
})
   


const updateContactById = asyncHandler(async (req, res)=>{
    try
    {
        const contact = await Contact.findById(req.params.id);

        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to update other user contacts");
        }
        
        const updateContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true} 
        )
        console.log(updateContact);
        res.status(200).json(updateContact);
    }
    catch(error)
    {
        res.status(404);
        throw new Error('Data not found');
    }
})

const deleteContactById = asyncHandler(async (req, res)=>{
    try
    {
        const contact = await Contact.findById(req.params.id);
        console.log("Matched Contact:", contact);
        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User don't have permission to update other user contacts");
        }

        console.log(contact);
        await Contact.deleteOne({_id: req.params.id});
        res.status(200).json(contact);
    }
    catch(error)
    {
        res.status(404);
        throw new Error('Data not found');
    }
})

module.exports = { getContacts, getContactsById, createContact, updateContactById, deleteContactById }
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Contact = require("../models/contactModel");

const router = express.Router();

// Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      occupation: req.body.occupation,
      company: req.body.company,
      password: passwordHash,
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single contact
router.get("/contacts/:id", (req, res) => {
  res.json(res.contact);
});

// Update a contact
router.put("/contacts/:id", async (req, res) => {
  if (req.body.firstName != null) {
    res.contact.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.contact.lastName = req.body.lastName;
  }
  if (req.body.middleName != null) {
    res.contact.middleName = req.body.middleName;
  }
  if (req.body.dob != null) {
    res.contact.dob = req.body.dob;
  }
  if (req.body.email != null) {
    res.contact.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.contact.phone = req.body.phone;
  }
  if (req.body.occupation != null) {
    res.contact.occupation = req.body.occupation;
  }
  if (req.body.company != null) {
    res.contact.company = req.body.company;
  }
  if (req.body.password != null) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    res.contact.password = hashedPassword;
  }
  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete contact
router.delete("/:id", (req, res) => {
  try {
    Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sucessfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Login route
router.post("/login", (req, res) => {
  Contact.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          data: err,
        });
      }
      if (!user) {
        return res.status(401).json({
          status: "error",
          data: "Incorrect email or password",
        });
      }
      const token = jwt.sign({ _id: user._id }, "secret");
      return res.status(200).json({
        status: "success",
        data: {
          token: token,
          user: user,
        },
      });
    }
  );
});

//Export router
module.exports = router;

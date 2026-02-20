import Contact from '../models/Contact.js';

// @desc  Save contact form message
// @route POST /api/contact
export const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const contact = await Contact.create({ name, email, subject, message });

        res.status(201).json({
            success: true,
            message: 'Message received! We will get back to you soon.',
            data: contact
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error. Please try again.', error: error.message });
    }
};

// @desc  Get all contact messages (admin)
// @route GET /api/contact
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching messages.', error: error.message });
    }
};

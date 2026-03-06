const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  createEvent, 
  deleteEvent, 
  getEventById, 
  updateEvent,    // ✅ Added this
  registerForEvent 
} = require('../controllers/eventController');

// Saare Raste (Routes)
router.get('/', getEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

// 🔥 Update/Edit ka rasta
router.put('/:id', updateEvent); // ✅ Ye missing tha, isliye 404 aa raha tha

// Registration ka rasta
router.post('/:id/register', registerForEvent);

module.exports = router;
const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  createEvent, 
  deleteEvent, 
  getEventById, 
  updateEvent, 
  registerForEvent,
  cancelRegistration // ✅ Ye naya controller import karna hoga
} = require('../controllers/eventController');

// Saare Raste (Routes)
router.get('/', getEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

// 🔥 Update/Edit ka rasta
router.put('/:id', updateEvent); 

// Registration aur Cancellation ke raste
router.post('/:id/register', registerForEvent);
router.post('/:id/cancel', cancelRegistration); // ✅ Cancel ka rasta add ho gaya

module.exports = router;
const Event = require('../models/Event');
const User = require('../models/User'); 

// Utility: Check if Date/Time is in past
const isPastDateTime = (dateString, timeString) => {
  const eventDateTime = new Date(`${dateString}T${timeString || "00:00"}`);
  const now = new Date();
  return eventDateTime < now;
};

// 1. Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
};

// 2. Create New Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;
    if (isPastDateTime(date, time)) return res.status(400).json({ message: "Past date not allowed!" });
    const newEvent = new Event({ title, description, date, time, location, category });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

// 3. Update Event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

// 4. Register for Event (FIXED)
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Seedha array mein ID check karo
    if (event.attendees.includes(studentId)) {
      return res.status(400).json({ message: "Already registered! 😊" });
    }

    event.attendees.push(studentId); 
    await event.save();
    res.status(200).json({ message: "Registration Successful!" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// 5. Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted!" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// 6. Get Single Event (FIXED for View Participants)
exports.getEventById = async (req, res) => {
  try {
    // ✅ attendees array ko seedha populate karo
    const event = await Event.findById(req.params.id).populate('attendees', 'fullName email division rollNo');
    if (!event) return res.status(404).json({ message: "Not found" });
    res.status(200).json(event);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
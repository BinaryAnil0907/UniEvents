const Event = require('../models/Event');
const User = require('../models/User'); 

// Utility: Check if Date/Time is in the past
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

// 2. Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;
    if (isPastDateTime(date, time)) {
      return res.status(400).json({ message: "Cannot create event in the past!" });
    }
    const newEvent = new Event({ title, description, date, time, location, category });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Error creating event", error: error.message });
  }
};

// 3. Get Single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// 4. Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.date || updateData.time) {
      const existing = await Event.findById(id);
      if (!existing) return res.status(404).json({ message: "Event not found" });

      const d = updateData.date || new Date(existing.date).toISOString().split('T')[0];
      const t = updateData.time || existing.time;
      
      if (isPastDateTime(d, t)) {
        return res.status(400).json({ message: "Cannot update to a past date/time!" });
      }
    }

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Event updated!", updated });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// 5. Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Register
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    
    // Check if student already registered (Optional logic)
    event.attendees.push({ studentId: req.body.studentId });
    await event.save();
    res.status(200).json({ message: "Registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
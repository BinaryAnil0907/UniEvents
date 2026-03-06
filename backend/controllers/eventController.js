const Event = require('../models/Event');

// 1. Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Events fetch nahi ho paye", error: error.message });
  }
};

// 2. Create New Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    if (!title || !description || !date || !location || !category) {
      return res.status(400).json({ message: "Bhai, saari fields bharna zaroori hai!" });
    }

    const newEvent = new Event({
      title, description, date, time, location, category,
      status: 'upcoming',
      attendees: [] 
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: "Database Error", error: error.message });
  }
};

// 🔥 3. UPDATE EVENT (New Logic added)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check karo kya event exist karta hai aur use update karo
    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event nahi mila update karne ke liye!" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Update fail ho gaya", error: error.message });
  }
};

// 4. Register for Event
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event nahi mila" });

    if (event.attendees.includes(studentId)) {
      return res.status(400).json({ message: "Aap pehle hi register kar chuke hain! 😊" });
    }

    event.attendees.push(studentId);
    await event.save();

    res.status(200).json({ message: "Registration Successful! 🎉", attendeesCount: event.attendees.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event successfully uda diya gaya!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event nahi mila" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
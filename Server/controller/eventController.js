import Event from "../models/Event.js";
import Registration from "../models/registration.js";

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const total = await Event.countDocuments();

    const events = await Event.find()
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    let registeredEvents = [];

    if (req.user) {
      const registrations = await Registration.find({
        user: req.user._id,
      });

      registeredEvents = registrations.map((r) =>
        r.event.toString()
      );
    }

    const updatedEvents = events.map((event) => ({
      ...event.toObject(),
      isRegistered: registeredEvents.includes(
        event._id.toString()
      ),
    }));

    res.json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      events: updatedEvents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
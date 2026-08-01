import Registration from "../models/registration.js";
import Event from "../models/Event.js";

// Register for an Event
  export const registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user._id,
      event: event._id,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "Already registered",
      });
    }

    await Registration.create({
      user: req.user._id,
      event: event._id,
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// cancelation
 export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      user: req.user._id,
      event: req.params.eventId,
    });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await Registration.findByIdAndDelete(registration._id);

    await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        $inc: {
          availableSeats: 1,
        },
      }
    );

    res.json({
      success: true,
      message: "Registration cancelled",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const checkRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      user: req.user._id,
      event: req.params.eventId,
    });

    res.json({
      registered: !!registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
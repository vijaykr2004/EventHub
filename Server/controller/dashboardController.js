import Registration from "../models/registration.js";

export const getDashboard = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    const today = new Date();

    const upcoming = registrations.filter(
      (item) => new Date(item.event.date) >= today
    );

    const past = registrations.filter(
      (item) => new Date(item.event.date) < today
    );

    res.json({
      success: true,

      summary: {
        totalRegistered: registrations.length,
        upcomingCount: upcoming.length,
        pastCount: past.length,
      },

      upcomingEvents: upcoming,

      pastEvents: past,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
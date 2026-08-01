import { CalendarDays, MapPin } from "lucide-react";
import { Link, useNavigate,  } from "react-router";
import { registerEvent,cancelRegistration,checkRegistration } from "../Service/registrationService";
import { useState } from "react";
import { useEffect } from "react";


const EventCard = ({ event }) => {
const [seats, setSeats] = useState(event.availableSeats);
const navigate=useNavigate();

const [registered, setRegistered] = useState(false);
useEffect(() => {
  const fetchStatus = async () => {
    try {
      const { data } = await checkRegistration(event._id);
      setRegistered(data.registered);
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.getItem("token")) {
    fetchStatus();
  }
}, [event._id]);
 const handleRegister = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    await registerEvent(event._id);

    alert("Registered Successfully");
    setRegistered(true);
    setSeats((prev) => prev - 1);
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};
const handleCancel = async () => {
  try {
    await cancelRegistration(event._id);

    alert("Registration Cancelled");

    setRegistered(false);
    setSeats((prev) => prev + 1);
  } catch (error) {
    alert(error.response?.data?.message);
  }
};
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl duration-300">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-52 object-cover"
        />

        <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      <div className="p-5">

        <h2 className="font-bold text-xl mb-3">
          {event.title}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <MapPin size={17} />
          {event.location}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <CalendarDays size={17} />
          {new Date(event.date).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})}
        </div>

        <p className="text-green-600 font-semibold mt-3">
          {seats} Seat Available
        </p>

        <div className="mt-5 flex gap-3">

          <Link
            to={`/events/${event._id}`}
            className="flex-1 text-center border border-purple-600 text-purple-600 rounded-lg py-2 hover:bg-purple-50"
          >
            View Details
          </Link>

          {/* <button className="flex-1 bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-700"
          onClick={handleRegister}
          >
            Register
          </button> */}
          {registered ? (
  <button
    onClick={handleCancel}
    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
  >
    Cancel Registration
  </button>
) : (
  <button
    onClick={handleRegister}
    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2"
  >
    Register
  </button>
)}

        </div>
      </div>
    </div>
  );
};

export default EventCard;
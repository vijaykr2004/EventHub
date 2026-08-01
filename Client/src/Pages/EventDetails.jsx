import { useEffect, useState,useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CalendarDays,
  MapPin,
  Users,
  Building2,
} from "lucide-react";

import { getEvent } from "../Service/eventService";
import {
  registerEvent,
  cancelRegistration,
  checkRegistration
} from "../Service/registrationService";

const EventDetails = () => {
  const navigate=useNavigate()
  const [registered, setRegistered] = useState(false);
  const { id } = useParams();
  useEffect(() => {
  const fetchStatus = async () => {
    try {
      const { data } = await checkRegistration(id);
      setRegistered(data.registered);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStatus();
}, [id]);
  

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
  try {
    setLoading(true);

    const { data } = await getEvent(id);

    setEvent(data.event);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  fetchEvent();
}, [fetchEvent]);
 
const handleRegister = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }
  try {
    await registerEvent(event._id);

    alert("Registration Successful");

    setRegistered(true);
    fetchEvent();
  } catch (error) {
    alert(error.response?.data?.message);
  }
};

const handleCancel = async () => {
  try {
    await cancelRegistration(event._id);

    alert("Registration Cancelled");

    setRegistered(false);
    fetchEvent();
  } catch (error) {
    alert(error.response?.data?.message);
  }
};

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading...
      </h2>
    );
  }

  if (!event) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Event Not Found
      </h2>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Banner */}

      <div className="relative h-112.5">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover px-10 rounded-full"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 left-10 text-white">

          <span className="bg-purple-600 px-4 py-1 rounded-full">
            {event.category}
          </span>

          <h1 className="text-5xl font-bold mt-4">
            {event.title}
          </h1>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 bg-white rounded-xl shadow p-8">

            <h2 className="text-3xl font-bold mb-5">
              About Event
            </h2>

            <p className="text-gray-600 leading-8">
              {event.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="flex gap-4">
                <CalendarDays className="text-purple-600" />
                <div>
                  <h3 className="font-semibold">
                    Date & Time
                  </h3>
                  <p>
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-red-500" />
                <div>
                  <h3 className="font-semibold">
                    Location
                  </h3>
                  <p>{event.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="text-green-600" />
                <div>
                  <h3 className="font-semibold">
                    Available Seats
                  </h3>
                  <p>{event.availableSeats}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Building2 className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">
                    Organizer
                  </h3>
                  <p>{event.organizer}</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white rounded-xl shadow p-8 h-fit">
  <h2 className="text-2xl font-bold mb-6">
    Registration
  </h2>

  {registered ? (
    <button
      onClick={handleCancel}
      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
    >
      Cancel Registration
    </button>
  ) : (
    <button
      onClick={handleRegister}
      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
    >
      Register Now
    </button>
  )}

  <hr className="my-8" />

  <div className="space-y-4">
    <div className="flex justify-between">
      <span>Category</span>
      <span>{event.category}</span>
    </div>

    <div className="flex justify-between">
      <span>Location</span>
      <span>{event.location}</span>
    </div>

    <div className="flex justify-between">
      <span>Capacity</span>
      <span>{event.capacity}</span>
    </div>

    <div className="flex justify-between">
      <span>Seats Left</span>
      <span>{event.availableSeats}</span>
    </div>
  </div>
</div>

        </div>

      </div>

    </div>
  );
};

export default EventDetails;
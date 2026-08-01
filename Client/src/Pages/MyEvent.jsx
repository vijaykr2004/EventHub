import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

import { getMyEvents } from "../Service/registrationService";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const { data } = await getMyEvents();
        
        setEvents(data.registrations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-2">
          My Events
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your registered events
        </p>

        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold mb-3">
              No Registered Events
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't registered for any events yet.
            </p>

            <Link
              to="/events"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Explore Events
            </Link>

          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.map((item) => {

              const event = item.event;

              return (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
                >

                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-6">

                    <span className="bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">
                      {event.category}
                    </span>

                    <h2 className="text-2xl font-bold mt-4">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-600 mt-4">
                      <MapPin size={18} />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <CalendarDays size={18} />
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <div className="mt-6 flex gap-3">

                      <Link
                        to={`/events/${event._id}`}
                        className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>
    </div>
  );
};

export default MyEvents;
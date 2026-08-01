import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { getEvents } from "../Service/eventService";

const PopularEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      try {
        const { data } = await getEvents({
          page: 1,
          limit: 4,
        });

        setEvents(data.events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-xl font-semibold">
          Loading events...
        </h2>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Popular Events
          </h2>

          <p className="text-gray-500 mt-2">
            Discover trending events happening near you.
          </p>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">
            No events available.
          </p>
        ) : (
          <>
            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10">
              <Link
                to="/events"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-4 rounded-xl font-semibold text-lg transition"
              >
                View All Events
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PopularEvent;
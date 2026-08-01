import { useEffect, useState } from "react";
import Pagination from "../Component/Pagination";
import EventCard from "../Component/EventCard";
import { getEvents } from "../Service/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 8;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const { data } = await getEvents({
          page,
          limit: perPage,
        });

        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading Events...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Explore Events
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))
        ) : (
          <p className="col-span-4 text-center text-xl">
            No events found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Events;
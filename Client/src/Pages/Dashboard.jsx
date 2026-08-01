import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Ticket } from "lucide-react";

import { getDashboard } from "../Service/dashboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome back 👋
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <Ticket className="text-indigo-600 mb-4" size={35} />
            <h2 className="text-3xl font-bold">
              {dashboard.summary.totalRegistered}
            </h2>
            <p>Registered Events</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <CalendarDays className="text-green-600 mb-4" size={35} />
            <h2 className="text-3xl font-bold">
              {dashboard.summary.upcomingCount}
            </h2>
            <p>Upcoming Events</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Clock3 className="text-orange-600 mb-4" size={35} />
            <h2 className="text-3xl font-bold">
              {dashboard.summary.pastCount}
            </h2>
            <p>Past Events</p>
          </div>

        </div>

        {/* Upcoming */}

        <div className="bg-white rounded-xl shadow mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Upcoming Events
          </h2>

          {dashboard.upcomingEvents.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            dashboard.upcomingEvents.map((item) => (
              <div
                key={item._id}
                className="border-b py-4"
              >
                <h3 className="font-semibold">
                  {item.event.title}
                </h3>

                <p className="text-gray-500">
                  {item.event.location}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(item.event.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
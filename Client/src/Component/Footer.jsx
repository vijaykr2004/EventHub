import { Link } from "react-router";
import { CalendarDays } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="text-purple-500" />
            <h2 className="text-2xl font-bold text-white">
              EventHub
            </h2>
          </div>

          <p>
            Discover, explore and register for amazing events around you.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/my-events">My Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Categories
          </h3>

          <ul className="space-y-2">
            <li>Technology</li>
            <li>Music</li>
            <li>Business</li>
            <li>Art</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <p>Email: support@eventhub.com</p>
          <p>Phone: +91 9876543210</p>
          <p>India</p>
        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center">
        © {new Date().getFullYear()} EventHub. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
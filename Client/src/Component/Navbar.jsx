import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-indigo-600 ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          EventHub
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/dashboard"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-events"
                className={navLinkClass}
              >
                My Events
              </NavLink>
            </>
          )}

        </div>

        {/* Desktop Auth */}

        <div className="hidden md:flex items-center gap-3">

          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-6 flex flex-col gap-4">

          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Events
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/dashboard"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-events"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                My Events
              </NavLink>
            </>
          )}

          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="border border-indigo-600 text-indigo-600 text-center py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-indigo-600 text-white text-center py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
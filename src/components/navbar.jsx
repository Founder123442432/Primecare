import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { adminemail } from "../App";
export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Automatically close dropdown if no user is logged in
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  return (
    <nav className="relative bg-white shadow ">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              className="w-52"
              src="src/assets/primecare-high-resolution-logo-transparent.png"
              alt="Logo"
            />
          </Link>
          <div className="flex lg:hidden md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
              aria-label="toggle menu"
              aria-expanded={navbarOpen}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            navbarOpen
              ? "translate-x-0 opacity-100 bg-white"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6 ">
            <Link
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500  dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/"
            >
              Home
            </Link>
            {user?.email == adminemail && (
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500  dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/admin/dashboard"
              >
                Admin
              </Link>
            )}
            <Link
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/doctors"
            >
              Doctors
            </Link>
            <Link
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              to="/aboutUs"
            >
              About
            </Link>
          </div>

          <div className="flex justify-center md:block relative">
            {loading ? (
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <div>
                {!user ? (
                  <Link to="/login">
                    <button className="flex overflow-hidden ring-[5px] ring-white w-[8.1rem] hover:w-[9.5rem] items-center gap-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-5 py-2 rounded-full transition-all ease-in-out hover:scale hover:scale-105 font-[revert] active:scale-100 shadow-lg">
                      Log in
                      <svg
                        className="size-6 mt-0.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <div>
                    <img
                      id="avatarButton"
                      onClick={() => setIsOpen((open) => !open)}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src={user.photoURL}
                      alt="User dropdown"
                    />
                    {isOpen && (
                      <div
                        id="userDropdown"
                        className="z-40 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          <div className="font-medium truncate">
                            {user.email}
                          </div>
                        </div>
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="avatarButton"
                        >
                          <li>
                            <Link
                              to="/myprofile"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/myappointments"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              My Appointments
                            </Link>
                          </li>
                        </ul>
                        <div className="py-1">
                          <div
                            onClick={() => auth.signOut()}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

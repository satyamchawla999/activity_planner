import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { deleteUser, logout, setPage } from "../../feature/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const dispatch = useDispatch();

  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Adoption", href: "/adoption", current: false },
  ]);

  const page = useSelector((state) => state.auth.page);

  const handleLogout = () => {
    dispatch(setPage({ page: "" }));
    dispatch(deleteUser());
    dispatch(logout());
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white-800"
      style={{ borderBottom: "1px solid red" }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src={require("../../assets/images/dog.png")}
                    alt="Your Company"
                  /> */}
                  {/* <p style={{ fontSize:"30px" }}>Pet Care</p> */}
                  <div
                    style={{ flexDirection: "row", height: "20px" }}
                    className="petLogo"
                  >
                    <img src={require("../../assets/images/dog.png")} alt="#" />
                    <span style={{ marginLeft: "5px" }}>
                      <p style={{ borderBottom: "1px solid red" }}>Pet Care</p>
                      <p style={{ fontSize: "9px", fontWeight: "normal" }}>
                        Activity Planner
                      </p>
                    </span>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {page === "dashboard" ? (
                      <a
                        href="/dashboard"
                        className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Dashboard
                      </a>
                    ) : (
                      <a
                        href="/dashboard"
                        className="text-red-600 hover:bg-red-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Dashboard
                      </a>
                    )}

                    {page === "adoption" ? (
                      <a
                        href="/adoption"
                        className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Adoption
                      </a>
                    ) : (
                      <a
                        href="/adoption"
                        className="text-red-600 hover:bg-red-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Adoption
                      </a>
                    )}

                    {page === "instruction" ? (
                      <a
                        href="/instructions"
                        className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Instruction
                      </a>
                    ) : (
                      <a
                        href="/instructions"
                        className="text-red-600 hover:bg-red-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Instruction
                      </a>
                    )}

                    {page === "helpline" ? (
                      <a
                        href="/helplines"
                        className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Helpline
                      </a>
                    ) : (
                      <a
                        href="/helpline"
                        className="text-red-600 hover:bg-red-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Helpline
                      </a>
                    )}
                    {/* {navigation.map((item) => (
                      <a
                        href='/dashboard'
                        className={classNames(
                          item.current
                            ? "bg-red-600 text-white"
                            : "text-red-600 hover:bg-red-400 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))} */}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button>
                      {/* <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span> */}
                      <div
                        onClick={handleLogout}
                        className="text-red-600"
                        style={{
                          display: "flex",
                          width: "5rem",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <p>Log out</p>
                      </div>
                    </Menu.Button>
                  </div>
                  {/* <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition> */}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

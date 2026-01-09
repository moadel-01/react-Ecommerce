import "./Navbar.css";

("use client");

import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  DialogTitle,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Fashion",
      featured: [
        {
          name: "Fragrances Collection",
          href: "/Fragrances",
          imageSrc: `/fragrance.png`,
          imageAlt: "Fragrance Image.",
        },
        {
          name: "Basic Tees",
          href: "/Shirts",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Women",
          items: [
            { name: "Tops", href: "/Tops" },
            { name: "Dresses", href: "/Dresses" },
            { name: "Bags", href: "/Bags" },
            { name: "Shoes", href: "/WShoes" },
            { name: "Jewellery", href: "/Jewellery" },
            { name: "Watches", href: "/Wwatches" },
          ],
        },
        {
          id: "accessories",
          name: "Men",
          items: [
            { name: "Shirts", href: "/Shirts" },
            { name: "Shoes", href: "/MShoes" },
            { name: "Watches", href: "/Mwatches" },
            { name: "Sunglasses", href: "/Glasses" },
            { name: "Sports Accessories", href: "/Sport" },
          ],
        },
        {
          id: "brands",
          name: "Beauty",
          items: [
            { name: "MakeUp", href: "/MakeUp" },
            { name: "Fragrances", href: "/Fragrances" },
            { name: "Skincare", href: "/Skincare" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Other Products",
      featured: [
        {
          name: "Fresh Vegetables",
          href: "/Groceries",
          imageSrc: `/veg.png`,
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "New iPhone is available",
          href: "/Smartphones",
          imageSrc: `/iphone.png`,
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Home Needs",
          items: [
            { name: "Groceries", href: "/Groceries" },
            { name: "Furniture", href: "/Furniture" },
            { name: "Home Decoration", href: "/Decoration" },
            { name: "Kitchen Accessories", href: "/KitAccessories" },
          ],
        },
        {
          id: "accessories",
          name: "Electronics",
          items: [
            { name: "Smartphones", href: "/Smartphones" },
            { name: "Tablets", href: "/Tablets" },
            { name: "Labtops", href: "/Labtops" },
            { name: "Mobile Accessories", href: "/MobAccessories" },
          ],
        },
        {
          id: "brands",
          name: "Vehicles",
          items: [
            { name: "Cars", href: "/Cars" },
            { name: "Motorcycles", href: "/Motorcycles" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Contact Us", href: "/contact" },
    // { name: "Profile", href: "/profile" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const tokenData = jwtDecode(token);
      setUser(tokenData);
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    }
  }
}, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const tokenData = jwtDecode(token);

  //     if (tokenData.exp * 1000 > Date.now()) {
  //       setUser(tokenData);
  //     }

  //     if (tokenData.exp * 1000 < Date.now()) {
  //       alert("your token expired");
  //       navigate("/");
  //       localStorage.removeItem("token");
  //       window.location.reload();
  //     }
  //   }
  // }, []);

  return (
    <div className="bg-white" id="nav">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {user?.role == "ADMIN" ? (
                <>
                  <div>
                    <Link
                      to={"/adminDashboard"}
                      className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    >
                      Admin Dashboard
                    </Link>
                  </div>

                  <div>
                    <Link
                      to={"/profile"}
                      className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    >
                      My Profile
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="cursor-pointer text-sm font-medium text-gray-700 hover:text-rose-600"
                  >
                    Logout
                  </button>
                </>
              ) : user?.role == "USER" ? (
                <>
                  <div>
                    <Link
                      to={"/profile"}
                      className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    >
                      My Profile
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="cursor-pointer text-sm font-medium text-gray-700 hover:text-rose-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="flow-root">
                    <Link
                      to={"/SignIn"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>

                  <div className="flow-root">
                    <Link
                      to={"/SignUp"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"}>
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="/newLogo.png" className="h-8 w-auto" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                          />
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow-sm"
                        />
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user?.role == "ADMIN" ? (
                    <>
                      <Link
                        to={"/adminDashboard"}
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                      >
                        Admin Dashboard
                      </Link>

                      <Link
                        to={"/profile"}
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setOpenModal(true);
                        }}
                        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-rose-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : user?.role == "USER" ? (
                    <>
                      <Link
                        to={"/profile"}
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setOpenModal(true);
                        }}
                        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-rose-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/SignIn"}
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                      >
                        Sign in
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <Link
                        to={"/SignUp"}
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </a>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={"/Cart"}>
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-indigo-500 group-hover:text-gray-900"
                    />
                  </Link>
                  {/* <span className="mt-0.5 px-1 pb-0.5 rounded-full bg-indigo-500 text-xs font-medium text-white group-hover:text-gray-400">0</span> */}
                  <span className="sr-only">items in cart, view bag</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 self-center items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ArrowRightStartOnRectangleIcon
                      aria-hidden="true"
                      className="size-6 text-rose-500"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Log out
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to log out of your account?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 transition duration-300 sm:ml-3 sm:w-auto cursor-pointer "
                  onClick={() => {
                    setOpenModal(false);
                    localStorage.removeItem("token");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Log out
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import FreshCartLogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const { token, logOut } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 h-15 shadow-sm py-3 fixed top-0 left-0 right-0 z-50 text-base sm:text-lg md:text-xl">
        <div className="container bg-slate-100 relative flex items-center justify-between px-4 sm:px-8 md:px-12">
          {/* Logo */}
          <Link to="/" aria-label="FreshCart Home">
            <img src={FreshCartLogo} alt="FreshCart brand logo" className="h-8 md:h-10 max-w-[150px] object-contain" />
          </Link>

          {/* Hamburger */}
          <button className="lg:hidden text-xl sm:text-2xl p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>

          {/* Menu */}
          <div
            className={`${menuOpen ? "max-h-[600px] opacity-100" : "min-h-[50px] max-h-0 opacity-0"}
              lg:opacity-100 lg:max-h-none lg:flex lg:flex-row lg:items-center lg:gap-8
              absolute lg:static top-full left-0 right-0
              bg-slate-100 lg:bg-transparent shadow-md lg:shadow-none
              overflow-hidden 
              flex flex-col gap-5 px-6 lg:p-0
            `}
          >
            {token && (<ul className="flex flex-col gap-3 lg:flex-row lg:gap-5">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Categories", path: "/categories" },
                { name: "Brands", path: "/brands" },
                { name: "Orders", path: "/allorders" },
              ].map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    aria-label={`Go to ${item.name}`}
                    className={({ isActive }) =>
                      `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            )}

            {/* Cart */}
            {token && (
              <Link to="/cart" aria-label="View shopping cart" className="cart text-base sm:text-lg cursor-pointer relative w-6 lg:ml-auto" onClick={() => setMenuOpen(false)}>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cartCounter flex justify-center items-center text-xs sm:text-sm font-bold absolute rounded-full h-5 w-5 right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white">
                  {cartInfo === null ? (<i className="fa-solid fa-spinner fa-spin" aria-label="Loading cart"></i>) : (<span>{cartInfo.numOfCartItems}</span>)}
                </div>
              </Link>
            )}

            {/* Social Links */}
            <ul className="flex gap-4 text-lg">
              {[
                { href: "https://instagram.com", icon: "instagram", label: "Instagram" },
                { href: "https://facebook.com", icon: "facebook", label: "Facebook" },
                { href: "https://linkedin.com", icon: "linkedin", label: "LinkedIn" },
              ].map((s) => (
                <li key={s.icon}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={`Visit our ${s.label} page`}>
                    <i className={`fa-brands fa-${s.icon}`}></i>
                  </a>
                </li>
              ))}
            </ul>

            {/* Auth Links */}
            <ul className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              {!token ? (
                <>
                  <li>
                    <NavLink to="/signup" aria-label="Sign up" onClick={() => setMenuOpen(false)} >
                      SignUp
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" aria-label="Login" onClick={() => setMenuOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="sm:pb-3 lg:pb-0">
                  <button onClick={() => { logOut(); setMenuOpen(false); }} className="text-lg relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 " aria-label="Logout">
                    <span>Logout</span>
                    <i className="fa-solid fa-right-from-bracket ms-2"></i>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

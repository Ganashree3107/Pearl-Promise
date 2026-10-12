import { Search, Heart, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `relative px-2 py-1 transition-colors duration-300 hover:text-pink-500 ${
    isActive ? "text-pink-500" : "text-gray-700"
  }`;

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const goToShopSearch = () => {
    if (!searchValue.trim()) return;
    navigate("/shop", { state: { search: searchValue } });
    setMobileOpen(false);
  };

  const handleProfileClick = () => {
    setMobileOpen(false);
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-pink-100 bg-white/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-10 xl:px-14">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <img
              src="/images/logo/PearlPromise-logo.png"
              alt="Pearl Promise Logo"
              className="h-16 w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-8 text-[18px] font-medium lg:flex xl:gap-10">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
            </li>
            <li className="group relative">
              <div className="flex cursor-pointer items-center gap-1 px-2 py-1 transition-colors duration-300 group-hover:text-pink-500">
                Combos
                <ChevronDown
                  size={17}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </div>
              <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 translate-y-2 rounded-2xl border border-pink-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  to="/combos/duos"
                  className="block rounded-xl px-4 py-3 text-[16px] text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
                >
                  Duos
                </Link>
                <Link
                  to="/combos/trios"
                  className="block rounded-xl px-4 py-3 text-[16px] text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
                >
                  Trios
                </Link>
                <Link
                  to="/combos/kits"
                  className="block rounded-xl px-4 py-3 text-[16px] text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
                >
                  Complete Kits
                </Link>
              </div>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showSearch ? "mr-2 w-44 opacity-100 sm:w-60" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-pink-200 bg-pink-50/40 px-4 py-2 text-sm outline-none focus:border-pink-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToShopSearch();
              }}
            />
          </div>

          <button
            onClick={() => {
              if (showSearch && searchValue.trim()) {
                goToShopSearch();
              } else {
                setShowSearch(!showSearch);
              }
            }}
            className="rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-pink-100"
            aria-label="Search"
          >
            <Search size={22} />
          </button>

          <Link
            to="/wishlist"
            className="rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-pink-100"
            aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ""}`}
          >
            <div className="relative">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
            </div>
          </Link>

          <Link
            to="/cart"
            className="rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-pink-100"
            aria-label="Cart"
          >
            <div className="relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          <button
            onClick={handleProfileClick}
            className="rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-pink-100"
            aria-label="Account"
          >
            <User size={22} />
          </button>

          <button
            className="rounded-full p-2 transition-all duration-300 hover:bg-pink-100 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-pink-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-3 text-base font-medium text-gray-700">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link to="/combos/duos" onClick={() => setMobileOpen(false)}>
              Duos
            </Link>
            <Link to="/combos/trios" onClick={() => setMobileOpen(false)}>
              Trios
            </Link>
            <Link to="/combos/kits" onClick={() => setMobileOpen(false)}>
              Complete Kits
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

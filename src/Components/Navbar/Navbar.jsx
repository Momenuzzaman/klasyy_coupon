import React from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/coupon">Coupons</NavLink>
      </li>
      {/* <li>
        <NavLink to="/users">Users</NavLink>
      </li> */}
    </>
  );
  return (
    <div className=" max-w-[1280px] px-5 mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <NavLink to="/">
          <img
            src="https://klassy.com.bd/public/uploads/settings/general/lrChtKFxC6of10DxZNezmW2eFIejECHWnZglkIHG.png"
            alt=""
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end space-x-3">
        <button className="bg-white flex">
          <b> SIGN IN</b>
          <FaUserCircle size={20} />
        </button>
        <button className="bg-white  flex">
          <b>MY CART</b>
          <FaShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

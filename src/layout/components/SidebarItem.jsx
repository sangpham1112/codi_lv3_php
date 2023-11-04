import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none" }}
      className={({ isActive }) =>
        isActive ? "sidebar-item active" : "sidebar-item"
      }
      end>
      <span className="sidebar-link">
        <i className="align-middle" />
        <span className="align-middle">{title}</span>
      </span>
    </NavLink>
  );
};

export default SidebarItem;

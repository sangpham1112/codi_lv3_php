import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItemDropdown = ({ id = "", title = "", itemList = [] }) => {
  return (
    <li className="sidebar-item">
      <a
        data-bs-target={"#" + id}
        data-bs-toggle="collapse"
        className="sidebar-link collapsed">
        <i className="align-middle" />
        <span className="align-middle">{title}</span>
      </a>
      <ul
        id={id}
        className="sidebar-dropdown list-unstyled collapse "
        data-bs-parent="#sidebar">
        {itemList.map((item, index) => {
          return (
            <NavLink
              to={item.to}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
              end
              key={index}>
              <span className="sidebar-link">{item.title}</span>
            </NavLink>
          );
        })}
      </ul>
    </li>
  );
};

export default SidebarItemDropdown;

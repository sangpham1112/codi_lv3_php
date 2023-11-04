import React from "react";
import SidebarItem from "./SidebarItem";
import SidebarItemDropdown from "./SidebarItemDropdown";
import SidebarHeader from "./SidebarHeader";
import { Link } from "react-router-dom";
import { GlobalContext } from "~/context/GlobalProvider";

const Sidebar = ({ toggle }) => {
  const { user } = React.useContext(GlobalContext);
  return (
    <nav
      id="sidebar"
      className={
        toggle ? "sidebar js-sidebar" : "sidebar js-sidebar collapsed"
      }>
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/">
          <span className="sidebar-brand-text align-middle">
            {user?.role_id == 1
              ? "Trang quản lý"
              : user?.role_id == 2
              ? "Trang Giảng viên"
              : "Trang sinh viên"}
          </span>
        </Link>
        <ul className="sidebar-nav">
          {user?.role_id == 3 && (
            <>
              <SidebarHeader title="Học viên" />
              <SidebarItem title="Học viên" to={"/student/" + user?.id} />
            </>
          )}
          {user?.role_id == 2 && (
            <>
              <SidebarHeader title="Giảng viên" />
              <SidebarItem
                title="Thông tin giảng viên"
                to={"/teacher/" + user?.id}
              />
              <SidebarItem
                title="Chấm công"
                to={"/teacher/check/" + user?.id}
              />
            </>
          )}

          {user?.role_id == 1 && (
            <>
              <SidebarHeader title="Admin" />
              <SidebarItem title="Dashboard" to="/dashboard" />
              <SidebarItem title="Người dùng" to="/users" />
              <SidebarItemDropdown
                title="Khoá học"
                id="classes"
                itemList={[
                  {
                    title: "Khoá học",
                    to: "/courses",
                  },
                  {
                    title: "Tạo khoá học",
                    to: "/courses/create",
                  },
                ]}
              />
              <SidebarItemDropdown
                title="Chức vụ"
                id="roles"
                itemList={[
                  {
                    title: "Bảng Chức vụ",
                    to: "/roles",
                  },
                  {
                    title: "Tạo chức vụ",
                    to: "/roles/create",
                  },
                ]}
              />
              <SidebarItemDropdown
                title="Loại khoá học"
                id="categories"
                itemList={[
                  {
                    title: "Bảng loại khoá học",
                    to: "/categories",
                  },
                  {
                    title: "Tạo loại khoá học",
                    to: "/categories/create",
                  },
                ]}
              />
              <SidebarItemDropdown
                title="Đào tạo"
                id="educations"
                itemList={[
                  {
                    title: "Bảng đào tạo",
                    to: "/educations",
                  },
                  {
                    title: "Tạo đào tạo",
                    to: "/educations/create",
                  },
                ]}
              />

              <SidebarItemDropdown
                title="Lớp học"
                id="schedules"
                itemList={[
                  {
                    title: "Bảng Lớp học",
                    to: "/schedules",
                  },
                  {
                    title: "Tạo Lớp học",
                    to: "/schedules/create",
                  },
                ]}
              />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

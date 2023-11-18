import noAvatar from "/img/avatar/no-avatar.png";
import { GlobalContext } from "~/context/GlobalProvider";
import { Link } from "react-router-dom";
import { ImageLink } from "../../utils/ImageLink";
import { useContext } from "react";

const Navbar = ({ toggle, onToggle }) => {
  const { user, Logout } = useContext(GlobalContext);

  const handleLogout = async () => {
    Logout();
  };

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a
        className="sidebar-toggle js-sidebar-toggle"
        onClick={() => onToggle(!toggle)}>
        <i className="hamburger align-self-center" />
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown" style={{ width: "140px" }}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={user?.avatar ? ImageLink + user?.avatar : noAvatar}
                  className="avatar img-fluid rounded me-1"
                  alt={user?.name}
                />
              </div>
              <div className="flex-grow-1 ps-2">
                <a
                  className="dropdown-toggle text-success fw-semibold"
                  href="#"
                  data-bs-toggle="dropdown">
                  {user?.name}
                </a>
                <div className="dropdown-menu w-100">
                  <Link className="dropdown-item" to={"/users/" + user?.id}>
                    Trang cá nhân
                  </Link>
                  <a className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </a>
                </div>

                <div className="text-secondary">
                  {user?.role_id == 1
                    ? "Admin"
                    : user?.role_id == 2
                    ? "Giảng viên"
                    : "Học viên"}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

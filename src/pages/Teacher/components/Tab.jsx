import { memo } from "react";

const Tab = memo(({ achivement, teachingMethod, description }) => {
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true">
            Đôi nét giảng viên
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false">
            Phương pháp giảng dạy
          </button>
          <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false">
            Thành tích nổi bật
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          dangerouslySetInnerHTML={{ __html: description }}></div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          dangerouslySetInnerHTML={{ __html: teachingMethod }}
          aria-labelledby="nav-profile-tab"></div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          dangerouslySetInnerHTML={{ __html: achivement }}
          aria-labelledby="nav-contact-tab"></div>
      </div>
    </>
  );
});

export default Tab;

import React from "react";

function Header() {
  return (
    <div className="Header" style={{
      backgroundColor: "#03a9f4",
      width: "100%",
      padding: "15px 0px 15px 0px"
    }}>
      <div className="container">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h1 style={{
            fontSize: "20px",
            textTransform: "capitalize",
            color: "#fff",
            fontWeight: "700",

          }}>
            Docker Dashboard
          </h1>
          <div className="ml-auto p-2">
            <span >
              <i className="far fa-user" style={{ color: "#fff", fontSize: "15px" }}></i>
            </span>
            <span style={{ color: "#fff", fontWeight: "500", padding: "0px 10px" }}>John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
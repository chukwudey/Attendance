import React from "react";

const Header = ({ icon }) => {
  return (
    <header>
      <img width="200px" alt="icon" src={icon} />
      <h1>Clock System</h1>
    </header>
  );
};

export default Header;

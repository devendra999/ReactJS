import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="logo">
          <h2>USERS</h2>
          <Link href="users/add-user">
            <button>add users</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;

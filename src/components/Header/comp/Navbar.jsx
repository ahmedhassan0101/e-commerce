// import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
// import { useState } from "react";

// import { useSession } from "next-auth/react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import AccountMenu from "./AccountMenu";
import Whishlist from "./Whishlist";
import NavMenu from "./NavMenu";
import NavCart from "./NavCart";
import DarkMode from "./DarkMode";

export default function Navbar() {
  return (
    <div className="bg-background ">
      <div className="container border-bottom grid grid-cols-2 lg:grid-cols-3 items-center py-3">
        {/* LOGO */}
        <div className="flex">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="w-28 md:w-44 " />
          </Link>
        </div>
        <SearchBox />
        <div className="flex items-center gap-3 justify-end">
          <NavMenu />
          <DarkMode />
          <Whishlist />
          <NavCart />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}

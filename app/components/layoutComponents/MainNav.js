import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <nav className="w-full px-4 py-4 md:px-8 lg:px-12 bg-white shadow flex justify-between items-center border-b border-gray-300">
      <Link href={"/"} className="text-base font-semibold text-red-500">
        Movies List
      </Link>
      <div className="flex gap-2">
        <button className="flex px-5 py-2 border border-red-500 text-red-500 rounded shadow">
          Sign Up
        </button>
        <button className="flex px-5 py-2 border border-red-500 bg-red-500 text-white rounded shadow">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default MainNav;

import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import logo from "../images/logo.png"

export const Header = () => {

    return (
<header className="bg-indigo-600">
  <nav className="px-2" aria-label="Top">
    <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
      <div className="flex items-center w-full justify-between px-6">
      <Link to="/">
          <span className="sr-only">Workflow</span>
          <img className="h-10 w-auto" src={logo} alt="" />
        </Link>
        <div className="hidden ml-10 space-x-8 lg:flex justify-end">
          <NavLink className="text-base font-medium text-white hover:text-indigo-50" activeClassName="underline" to="/about">About</NavLink>

          <NavLink className="text-base font-medium text-white hover:text-indigo-50" activeClassName="underline" to="/contact">Contact</NavLink>
        </div>
      </div>
      {/* <div className="ml-10 space-x-4">
        <a href="#" className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Sign in</a>
        <a href="#" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Sign up</a>
      </div> */}
    </div>
    <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
      <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
        Solutions
      </a>

      <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
        Pricing
      </a>

      <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Docs">
        Docs
      </a>

      <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Company">
        Company
      </a>
    </div>
  </nav>
</header>
    );
}
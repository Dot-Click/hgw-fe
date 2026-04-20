"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Avatar, Dropdown } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSession, logout } from "@/store/slices/authSlice";
import Loader from "@/components/common/Loader";
import {
  FiHome,
  FiBarChart2,
  FiDatabase,
  FiMic,
  FiFileText,
  FiHelpCircle,
  FiUser
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isInitialLoading, loading: isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);
  console.log(user);

  const navLinks = [
    { id: "home", name: "Home", path: "/", icon: <FiHome /> },
    {
      id: "leaderboard",
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <FiBarChart2 />,
    },
    { id: "database", name: "Database", path: "/database", icon: <FiDatabase /> },
    { id: "domination", name: "Domination", path: "/domination", icon: <FiBarChart2 /> },
    { id: "podcast", name: "Podcast", path: "/podcast", icon: <FiMic /> },
    { id: "article", name: "Article", path: "/article", icon: <FiFileText /> },
    { id: "about", name: "About", path: "/about", icon: <FiHelpCircle /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed top-0 h-20 outfit left-0 right-0 z-50 bg-[#111217] border-b border-[#24262E] px-6 py-4 flex items-center justify-between xl:justify-around">
        {/* Logo */}
        <Link href="/" id="navbar-logo" className="flex items-center gap-3">
          <img
            src="/nav-logo.svg"
            alt="Logo"
            className="object-contain w-20 md:w-24 lg:w-16"
          />
          <p className="orbitron text-[#7B899D] text-[11px] md:text-[16px] lg:text-[12px] font-[700]  text-[#E7EBEF] uppercase tracking-[0.5px] ">
            HGW LEGEND VAULT
          </p>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              id={link.id}
              href={link.path}
              className={`px-[10px] py-2 text-[13px] font-[500] transition-all duration-200 rounded-[8px] ${isActive(link.path)
                ? "text-[#00CCFF] bg-[#00CCFF1A]"
                : "text-[#7B899D] hover:text-[#00CCFF] hover:bg-white/5"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center gap-4 min-w-[150px] justify-end">
          {isInitialLoading || isLoading ? (
            <Loader size="sm" label="" className="w-8 h-8" />
          ) : isAuthenticated && user ? (
            <Dropdown.Root>
              <Dropdown.Trigger>
                <div className="flex items-center gap-2 bg-[#1B1C22] px-2 py-1 rounded-[14px] border border-[#24262E] cursor-pointer hover:bg-[#24262E] transition-colors group">
                  <Avatar className="w-7 h-7 border border-[#00CCFF50]">
                    {user.image && <Avatar.Image src={user.image} />}
                    <Avatar.Fallback className="text-[11px] orbitron font-bold">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-[13px] font-[500] text-[#E7EBEF] outfit leading-none group-hover:text-[#00CCFF] transition-colors">
                    {user.name?.split(' ')[0] || "User"}
                  </span>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover className="bg-[#111217] border border-[#24262E] shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-[200px]">
                <Dropdown.Menu className="p-2">
                  <Dropdown.Item key="profile" className="flex items-start gap-0.5 p-2 border-b border-[#24262E] hover:bg-transparent">
                    <p className="text-[13px] font-[400] text-[#E7EBEF] outfit truncate w-full">{user.name || user.email}</p>
                    
                  </Dropdown.Item>
                  <Dropdown.Item 
                    key="logout" 
                    className="mt-2 p-3 rounded-lg hover:bg-red-500/10 transition-colors group cursor-pointer"
                    onClick={() => dispatch(logout())}
                  >
                    <div className="flex items-center gap-3 text-red-400 group-hover:text-red-300">
                      <LuLogOut className="text-sm" />
                      <span className="font-[500] outfit text-[13px]">LOGOUT</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          ) : (
            <Link
              href="/login"
              id="navbar-login-btn"
              className="flex items-center gap-2 shadow-[0_0_10px_#00CCFF1A,0_0_20px_#00CCFF4D]
              text-[16px] px-4 py-2 border border-[#00CCFF80] text-[#00CCFF] font-medium rounded-[12px] transition-all duration-300"
            >
              <LuLogIn className="text-base" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#00CCFF] text-3xl cursor-pointer p-1"
        >
          <HiOutlineMenuAlt3 />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-[#0D0E12] border-l border-[#24262E] z-[70] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden flex flex-col p-6 font-sans ${isOpen
          ? "translate-x-0 shadow-[-20px_0_40px_rgba(0,204,255,0.1)]"
          : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between mb-8 border-b border-[#24262E] pb-6">
          <img src="/logo.svg" alt="Logo" className="h-8 object-contain" />
          <button
            onClick={toggleMenu}
            className="bg-[#1B1C22] p-1 rounded-lg text-[#7B899D] hover:text-[#00CCFF] transition-colors cursor-pointer"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="orbitron text-[#7B899D] text-[12px] uppercase tracking-[3px] mb-4 pl-2">
            Navigation
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              onClick={toggleMenu}
              className={`flex items-center gap-4 px-4 py-3.5 text-[16px] font-[500] transition-all duration-300 rounded-[14px] ${isActive(link.path)
                ? "text-[#00CCFF] bg-[#00CCFF14] shadow-[inset_0_0_10px_#00CCFF0D] border-l-4 border-[#00CCFF]"
                : "text-[#7B899D] hover:text-[#FFFFFF] hover:bg-[#1B1C22]"
                }`}
            >
              <span
                className={`text-xl ${isOpen
                  ? "animate-in fade-in slide-in-from-left-4 duration-500"
                  : ""
                  }`}
              >
                {link.icon}
              </span>
              <span className="orbitron tracking-wide">{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-[#24262E]">
          {isInitialLoading || isLoading ? (
            <div className="bg-[#1B1C22] p-8 rounded-[16px] border border-[#24262E]">
              <Loader label="Syncing with Vault..." />
            </div>
          ) : isAuthenticated && user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-[#1B1C22] p-4 rounded-[16px] border border-[#24262E]">
                <Avatar className="w-12 h-12 border border-[#00CCFF50]">
                  {user.image && <Avatar.Image src={user.image} />}
                  <Avatar.Fallback className="outfit font-[500] text-[14px]">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[17px] font-[500] text-[#E7EBEF] outfit">
                    {user.name || "User"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                   dispatch(logout());
                   toggleMenu();
                }}
                className="flex items-center justify-center gap-3 text-[17px] py-4 bg-red-500/10 border border-red-500/30 text-red-500 font-bold rounded-[16px] transition-all duration-300 orbitron hover:bg-red-500/20 cursor-pointer"
              >
                <LuLogOut className="text-2xl" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-3 shadow-[0_0_20px_#00CCFF33]
              text-[17px] py-4 bg-[#00CCFF1A] border border-[#00CCFF80] text-[#00CCFF] font-bold rounded-[16px] transition-all duration-300 orbitron hover:bg-[#00CCFF26]"
            >
              <LuLogIn className="text-2xl" />
              <span>LOGIN</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

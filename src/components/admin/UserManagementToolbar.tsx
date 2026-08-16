"use client";

import { FiSearch, FiChevronDown, FiFilter } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const ROLE_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "supporter", label: "Supporter" },
  { value: "creator", label: "Creator" },
  { value: "admin", label: "Admin" },
];

const UserManagementToolbar = () => {
  const [role, setRole] = useState("all");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    ROLE_OPTIONS.find((o) => o.value === role)?.label ?? "All Roles";

  return (
    <div className="flex items-center gap-6 rounded-lg bg-white shadow p-2">
      {/* Search input */}
      <div className="relative flex-1">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-md border border-zinc-500 py-2 pl-9 pr-3 text-sm text-gray-200 placeholder:text-gray-500 outline-none transition-colors focus:border-zinc-800 focus:ring-2 focus:ring-zinc-500/20"
        />
      </div>

      {/* Role filter dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-md text-zinc-900 border border-zinc-500 px-3 py-2 text-sm font-semibold  shadow-sm transition-colors hover:bg-zinc-500 hover:text-white"
        >
          <FiFilter className="h-4 w-4 text-zinc-900" />
          Filter by {currentLabel === "All Roles" ? "Role" : currentLabel}
          <FiChevronDown
            className={`h-4 w-4 text-indigo-300 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-md border border-white/10 bg-[#0f0f1a] py-1 shadow-lg"
          >
            {ROLE_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    setRole(option.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-indigo-950 ${
                    role === option.value
                      ? "text-indigo-300 font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserManagementToolbar;
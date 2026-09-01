"use client";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useMemo, useState } from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: "admin" | "creator" | "supporter";
  credits: number;
  createdAt: string;
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
}

type SortKey = "name" | "email" | "role" | "credits";
type SortDirection = "asc" | "desc";

const ROLE_STYLES: Record<User["role"], { label: string; dot: string; text: string }> = {
  admin: { label: "Admin", dot: "bg-emerald-500", text: "text-emerald-600" },
  creator: { label: "Creator", dot: "bg-amber-500", text: "text-amber-600" },
  supporter: { label: "Supporter", dot: "bg-blue-500", text: "text-blue-600" },
};

const PAGE_SIZE = 12;

const UserTable = ({ users }: UserTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return aVal - bVal;
      }
      return String(aVal).localeCompare(String(bVal));
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [users, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE));
  const paginatedUsers = sortedUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );




  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-primary-light/50 text-sm">
          <thead>
            <tr className="border-b border-primary-light/50 bg-primary">
              <th className="px-6 py-3 text-left">
               NAME
              </th>
              <th className="px-6 py-3 text-left">
               EMAIL 
              </th>
              <th className="px-6 py-3 text-left">
                ROLE
              </th>
              <th className="px-6 py-3 text-left">
               CREDITS
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => {
              const roleStyle = ROLE_STYLES[user.role];
              return (
                <tr
                  key={user.id}
                  className="border-b border-accent  hover:bg-primary/10"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                      width={32}
                      height={32}
                        src={user.image}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${roleStyle.dot}`}
                      />
                      <span className={`font-medium ${roleStyle.text}`}>
                        {roleStyle.label}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {user.credits}
                  </td>
                </tr>
              );
            })}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
        <span className="text-xs text-primary">
          {sortedUsers.length} items &middot; Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-text transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                num === page
                  ? "bg-primary text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-text transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
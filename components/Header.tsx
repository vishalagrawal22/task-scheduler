import Image from "next/image";
import { useState } from "react";

import { logout } from "../utils/auth/client";
import { IUser } from "../utils/interfaces/User";

export function Header({ user }: { user: IUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="p-4 dropdown dropdown-end">
      <div className="flex items-center">
        <div className="font-bold text-xl">Task Scheduler</div>
        <Image
          alt={user.displayName || user.email || ""}
          src={user.photoURL || "/images/user-default.png"}
          className="ml-auto mb-2 rounded-full"
          width="50"
          height="50"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
        />
      </div>
      {dropdownOpen && (
        <ul
          tabIndex={0}
          className="ml-auto dropdown-content menu shadow-lg border bg-base-100 rounded-box w-52 rounded-md"
        >
          <li className="p-2 pb-0">
            Signed in as{" "}
            <div className="font-bold">
              {user.displayName || user.email || ""}
            </div>
          </li>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <li className="px-2 pb-2" onClick={logout}>
            <span>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
}

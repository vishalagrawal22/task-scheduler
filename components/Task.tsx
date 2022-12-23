import { useState } from "react";
import { DateTime } from "luxon";

import { ITask } from "../utils/interfaces/Task";

const MAX_SHORT_DESCRIPTION_LENGTH = 80;

export function Task({ task }: { task: ITask }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const date = DateTime.fromISO(new Date(task.scheduledDate).toISOString());
  const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

  return (
    <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col items-end px-2 pt-2">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Toggle dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <div
            id="dropdown"
            className="absolute mt-10 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44"
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-grow items-center pb-6">
        <h5 className="mb-1 text-xl font-medium text-gray-900">{task.title}</h5>
        <span className="mx-6 mb-3 text-sm text-gray-500">{humanReadable}</span>
        {task.description && (
          <span className="mx-6 text-sm text-gray-700">
            {showFullDescription ? (
              task.description
            ) : (
              <>
                {task.description.substring(0, MAX_SHORT_DESCRIPTION_LENGTH)}
                {task.description.length > MAX_SHORT_DESCRIPTION_LENGTH && (
                  <>
                    ...
                    <span
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setShowFullDescription(true)}
                    >
                      {" "}
                      read more
                    </span>
                  </>
                )}
              </>
            )}
          </span>
        )}
        {!task.completed ? (
          <div className="flex mt-4 space-x-3 md:mt-6">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Mark as complete
            </span>
          </div>
        ) : (
          <div className="flex mt-4 space-x-3 md:mt-6">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Mark as incomplete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

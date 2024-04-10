import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profileApi } from "../apis/usersApi";
import StatusMessage from "../components/StatusMessage.component";
import ReactMarkdown from "react-markdown";

const ContentHistory = () => {
  const [expandedContentId, setExpandedContentId] = useState(null);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: profileApi,
    queryKey: ["profile"],
  });
  const toggleExpand = (contentId) => {
    setExpandedContentId((prevState) =>
      prevState === contentId ? null : contentId
    );
  };
  if (isLoading) {
    <StatusMessage type={"loading"} message={"Loading..."} />;
  }
  if (isError) {
    <StatusMessage type={"error"} message={error?.response?.data?.message} />;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Generated Content History
        </h2>
        <Link
          to="/generate-content"
          className="mb-4 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center w-52"
        >
          <FaPlusSquare className="mr-2" /> Create New Content
        </Link>
        {/* Content history list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {data?.user?.history.length <= 0 ? (
            <div className="px-6 py-4">
              <strong>Looks Like Your History Is Clear</strong>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {data?.user?.history.map((content) => {
                const isExpanded = expandedContentId === content._id;
                return (
                  <li key={content?._id} className="flex flex-col">
                    <div className="px-6 py-4 flex items-center justify-between space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {content?.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(content?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-green-500 hover:text-green-600 cursor-pointer"
                          onClick={() => toggleExpand(content?._id)}
                        >
                          {isExpanded ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        <button className="text-red-500 hover:text-red-600 cursor-pointer">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                    {/* Render ReactMarkdown content if expanded */}
                    {isExpanded && (
                      <div className="px-6 py-4">
                        <ReactMarkdown>{content?.content}</ReactMarkdown>
                      </div>
                    )}
                  </li>
                );
              })}
              {/* Additional list items can be added here */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentHistory;

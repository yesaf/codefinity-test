import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-gray-light"></div>
    </div>
  );
}
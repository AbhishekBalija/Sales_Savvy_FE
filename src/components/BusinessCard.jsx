/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SalesChart from "./SalesChart";

const BusinessCard = ({
  title,
  description,
  icon: Icon,
  onFetch,
  className,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleClick = () => {
    if (!hasLoaded) {
      onFetch();
      setHasLoaded(true);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className={`p-6 rounded-lg bg-gray-800 border border-gray-700 shadow-lg cursor-pointer 
          hover:bg-gray-750 transition-all duration-200 ${
            isExpanded ? "rounded-b-none" : ""
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${className}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-gray-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="border border-t-0 border-gray-700 rounded-b-lg bg-gray-800 p-6">
          <SalesChart data={data} title={`${title} Breakdown`} />
        </div>
      )}
    </div>
  );
};

export default BusinessCard;

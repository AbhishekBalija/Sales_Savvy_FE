/* eslint-disable react/prop-types */
import { useState } from "react";

const ActionCard = ({ title, description, icon: Icon, action, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-purple-500/10 hover:translate-y-[-2px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={action}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${className}`}>
            <Icon
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                isHovered ? "scale-110" : ""
              }`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;

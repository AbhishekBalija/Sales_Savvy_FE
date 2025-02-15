/* eslint-disable react/prop-types */

const StatCard = ({ title, value, icon: Icon, className }) => (
  <div className="p-6 rounded-lg bg-gray-800 border border-gray-700 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-2">
          ${Number(value).toLocaleString()}
        </h3>
      </div>
      <div className={`p-3 rounded-full ${className}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;

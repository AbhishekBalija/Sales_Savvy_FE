/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data, title }) => {
  const chartData = Object.entries(data?.categorySales || {}).map(
    ([category, sales]) => ({
      category,
      sales,
    })
  );

  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="sales" fill="#a855f7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;

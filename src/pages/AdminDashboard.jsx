import {
  Activity,
  DollarSign,
  Calendar,
  TrendingUp,
  Plus,
  Trash2,
  Package,
} from "lucide-react";
import useBusiness from "../hooks/useBusiness";
import BusinessCard from "../components/BusinessCard";
import ActionCard from "../components/ActionCard";
import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import { useState } from "react";

const AdminDashboard = () => {
  const {
    dailyData,
    monthlyData,
    yearlyData,
    overallData,
    loading,
    error,
    fetchMonthlyData,
    fetchDailyData,
    fetchYearlyData,
    fetchOverallData,
  } = useBusiness();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const businessCards = [
    {
      title: "Daily Business",
      description: "View your daily sales and category breakdown",
      icon: Activity,
      onFetch: fetchDailyData,
      data: dailyData,
      className: "bg-purple-500",
    },
    {
      title: "Monthly Business",
      description: "View your monthly sales and category breakdown",
      icon: Calendar,
      onFetch: fetchMonthlyData,
      data: monthlyData,
      className: "bg-purple-600",
    },
    {
      title: "Yearly Business",
      description: "View your yearly sales and category breakdown",
      icon: TrendingUp,
      onFetch: fetchYearlyData,
      data: yearlyData,
      className: "bg-purple-700",
    },
    {
      title: "Overall Business",
      description: "View your overall sales and category breakdown",
      icon: DollarSign,
      onFetch: fetchOverallData,
      data: overallData,
      className: "bg-purple-800",
    },
  ];

  // Update the handler functions
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-purple-500" />
              <span className="text-gray-400">Products Management</span>
            </div>
          </div>
          <p className="text-gray-400">
            Manage your business and products in one place
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ActionCard
            title="Add Product"
            description="Add new products to your inventory"
            icon={Plus}
            action={handleAddProduct}
            className="bg-green-500"
          />
          <ActionCard
            title="Delete Product"
            description="Remove products from your inventory"
            icon={Trash2}
            action={handleDeleteProduct}
            className="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {businessCards.map((card, index) => (
            <BusinessCard
              key={index}
              {...card}
              loading={loading}
              error={error}
            />
          ))}
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;

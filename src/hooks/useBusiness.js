import { useState } from 'react';

const useBusiness = () => {
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [overallData, setOverallData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBusinessData = async (endpoint, setData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/admin${endpoint}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyData = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    fetchBusinessData(`/business/monthly?month=${month}&year=${year}`, setMonthlyData);
  };

  const fetchDailyData = () => {
    const date = new Date().toISOString().split('T')[0];
    fetchBusinessData(`/business/daily?date=${date}`, setDailyData);
  };

  const fetchYearlyData = () => {
    const year = new Date().getFullYear();
    fetchBusinessData(`/business/yearly?year=${year}`, setYearlyData);
  };

  const fetchOverallData = () => {
    fetchBusinessData('/business/overall', setOverallData);
  };

  return {
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
  };
};

export default useBusiness;
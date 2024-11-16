import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components that are required
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const KeywordChart = ({ groupId, userId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeywordData = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        const response = await axios.get(`https://tele-intelli-production.up.railway.app/keywordchart`, {
          params: { userId, groupId },
        });
        const data = response.data;

        if (data.length === 0) {
          console.warn("No keyword data returned.");
        }

        const labels = data.map(item => item.keyword);
        const usageCounts = data.map(item => item.count);
        
        setChartData({
          labels,
          datasets: [{
            label: 'Keyword Usage',
            data: usageCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }],
        });
      } catch (err) {
        console.error("Error fetching keyword data:", err);
        setError("Failed to load keyword data.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch keyword data when groupId or userId changes
    if (groupId && userId) {
      fetchKeywordData();
    }
  }, [groupId, userId]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;
  if (!chartData) return <p>No data available.</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Keyword Usage Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default KeywordChart;

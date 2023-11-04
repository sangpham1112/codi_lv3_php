import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { memo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartBar = memo(({ totalPricePerMonth }) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
  ];

  const data = {
    labels: totalPricePerMonth.map((item) => `Tháng ${item.month}`),
    datasets: [
      {
        label: "Tổng giá",
        data: totalPricePerMonth.map((item) => item.total),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h5 className="card-title mb-0">Thu nhập theo tháng</h5>
      </div>
      <div className="card-body d-flex w-100">
        <div className="align-self-center chart chart-lg">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
});

export default ChartBar;

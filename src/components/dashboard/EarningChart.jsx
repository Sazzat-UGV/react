
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"

const COLORS = {
  Sat: "#8a7bff",
  Sun: "#ff8a80",
  Mon: "#80deea",
  Tue: "#ffb74d",
  Wed: "#5c7cfa",
  Thu: "#66bb6a",
  Fri: "#9966cc",
}

export default function DonutChart({ earningData = [] }) {
  // Transform backend data to chart format with colors
  const data = earningData.map(item => ({
    name: item.day,
    value: item.total,
    color: COLORS[item.day] || "#ccc" // fallback color
  }));

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const formattedTotal = total.toFixed(1);

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    const item = data[index];
    const textAnchor = x > cx ? "start" : "end";

    return (
      <g>
        <text
          x={x}
          y={y - 15}
          fill={item.color}
          textAnchor={textAnchor}
          dominantBaseline="central"
          fontWeight="bold"
        >
          {item.name}
        </text>
        <text
          x={x}
          y={y + 15}
          fill={item.color}
          textAnchor={textAnchor}
          dominantBaseline="central"
        >
          ${item.value}
        </text>
        <line
          x1={cx + (innerRadius + 5) * Math.cos((-midAngle * Math.PI) / 180)}
          y1={cy + (innerRadius + 5) * Math.sin((-midAngle * Math.PI) / 180)}
          x2={x - (textAnchor === "start" ? -5 : 5)}
          y2={y}
          stroke={item.color}
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="pointer-events-none w-full h-[600px] flex items-center justify-center bg-[#fff] rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            innerRadius={100}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              content={() => (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  {formattedTotal}
                </text>
              )}
              position="center"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



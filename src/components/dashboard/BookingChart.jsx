
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

export default function BookingChart({ bookingData }) {
  const data = bookingData && bookingData.length ? bookingData : [];
  const maxTotal = Math.max(...data.map(item => item.total), 100);

  // Custom Legend Renderer
  const renderCustomLegend = () => {
    return (
      <div >
        <div className="flex items-center justify-center gap-2">
          <span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="7" width="16" height="2" fill="#0063E5" />
              <circle cx="8.5" cy="8" r="3.5" fill="white" stroke="#0063E5" />
            </svg>
          </span>
          <p className="text-[#3b82f6]">Services</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[600px] p-6 bg-[#fff] rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            domain={[0, Math.ceil(maxTotal / 10) * 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{ color: '#3b82f6' }}
            labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />

          {/* Custom Legend */}
          <Legend
            verticalAlign="bottom"
            height={36}
            content={renderCustomLegend}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

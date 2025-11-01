



import { useState } from "react";

const TimePickerModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedTime,
  setSelectedTime
//   initialTime = { hour: 12, minute: 0, second: 0, period:"AM" },
}) => {
//   const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleHourChange = (hour) => {
    setSelectedTime((prev) => ({ ...prev, hour }));
  };

  const handleMinuteChange = (minute) => {
    setSelectedTime((prev) => ({ ...prev, minute }));
  };

  const handleSecondChange = (second) => {
    setSelectedTime((prev) => ({ ...prev, second }));
  };

  const handlePeriodChange = (period) => {
    setSelectedTime((prev) => ({ ...prev, period }));
  };

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const formatTimeString = () => {
    const { hour, minute, second, period } = selectedTime;
    return `${formatNumber(hour)}:${formatNumber(minute)}: ${period}`;
  };

  const handleConfirm = () => {
    onConfirm(formatTimeString());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Time</h2>

        {/* Time Display */}
        <div className="flex items-center justify-center mb-6">
          {/* Hour Section */}
          <div className="flex flex-col items-center mx-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 min-w-[70px] text-center">
              <span className="text-2xl font-medium text-gray-800">
                {formatNumber(selectedTime.hour)}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Hour</span>
          </div>

          <div className="text-2xl font-light text-gray-400 mx-1">:</div>

          {/* Minute Section */}
          <div className="flex flex-col items-center mx-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 min-w-[70px] text-center">
              <span className="text-2xl font-medium text-gray-800">
                {formatNumber(selectedTime.minute)}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Minute</span>
          </div>

          <div className="text-2xl font-light text-gray-400 mx-1">:</div>



          {/* AM/PM Section */}
          <div className="ml-4 flex flex-col">
            <button
              onClick={() => handlePeriodChange("AM")}
              className={`px-4 py-2 rounded-t-lg border text-sm font-medium ${
                selectedTime.period === "AM"
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => handlePeriodChange("PM")}
              className={`px-4 py-2 rounded-b-lg border border-t-0 text-sm font-medium ${
                selectedTime.period === "PM"
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Time Selection Grids */}
        <div className="space-y-4">
          {/* Hour Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hour</h3>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleHourChange(hour)}
                  className={`py-2 rounded-md text-sm ${
                    selectedTime.hour === hour
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>

          {/* Minute Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Minute</h3>
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <button
                  key={minute}
                  onClick={() => handleMinuteChange(minute)}
                  className={`py-1 rounded-md text-xs ${
                    selectedTime.minute === minute
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formatNumber(minute)}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
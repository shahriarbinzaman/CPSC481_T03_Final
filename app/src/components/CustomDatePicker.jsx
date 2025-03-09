import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="view date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;

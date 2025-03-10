import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { UserSelectionContext } from "../contexts";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const prevDate = () => {
    const newDay = selectedDate.subtract(1, "day");
    setSelectedDate(newDay);
  };
  const nextDate = () => {
    const newDate = selectedDate.add(1, "day");
    setSelectedDate(newDate);
  };

  const { setDate } = useContext(UserSelectionContext);

  useEffect(() => {
    setDate(selectedDate.format("dddd, MMMM D YYYY"));
  }, [selectedDate, setDate]);

  return (
    <div className="d-flex align-items-center mb-4">
      <ArrowBackIosOutlinedIcon fontSize="large" onClick={prevDate} />
      <DesktopDatePicker
        label="view date"
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        // Specify the input component via the slots prop
        slots={{
          textField: TextField,
        }}
        // Pass custom styles to the text field via slotProps
        slotProps={{
          textField: {
            sx: {
              // Customize the input container
              "& .MuiInputBase-root": {
                backgroundColor: "#333",
                color: "#bad3ee",
                borderRadius: "8px",
                fontSize: "1.5rem",
              },
              // Style the label
              "& .MuiInputLabel-root": {
                color: "#bad3ee",
                fontSize: "1.5rem",
              },
              // Customize the outlined border
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#bad3ee",
              },
            },
          },
          openPickerIcon: {
            sx: {
              color: "#bad3ee",
              "& .MuiInputAdornment-root": {
                color: "#bad3ee",
              },
            },
          },
        }}
      />
      <ArrowForwardIosOutlinedIcon fontSize="large" onClick={nextDate} />
    </div>
  );
};

export default CustomDatePicker;

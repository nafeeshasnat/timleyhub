import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

const MainTracker = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return(
    <div>
      <h1>Time Tracker</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        label="Date picker"
        inputFormat="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        orientation="landscape"xs
        renderInput={(params) => <TextField {...params} />}
        slotProps={{
          actionBar: {
            actions: [''],
          },
        }}
      />
    </LocalizationProvider>
    </div>
  )
}

export default MainTracker;
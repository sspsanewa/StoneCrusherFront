import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Date(props) {
    const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const dayjsObject = dayjs(selectedDate); // Replace '2022-04-14' with your actual date string

    const formattedDate = dayjsObject.format('YYYY-MM-DD'); // Change the format string as per your requirement
    props.setDate(formattedDate)
    console.log(formattedDate);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DatePicker',
                    'MobileDatePicker',
                    'DesktopDatePicker',
                    'StaticDatePicker',
                ]}
            >
                <DemoItem>
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateEdit(props) {
    console.log('initialDate prop', props.date)
    let dateStr = props.date; // Example of a different format
    let parts = dateStr.split("-");
    let temp = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log('temp', temp); // Output: 2024-07-16

    const [selectedDate, setSelectedDate] = useState(dayjs(temp));

    const handleDateChange = (date) => {
        props.setDate(date);
    };
    const dayjsObject = dayjs(temp); // Replace '2022-04-14' with your actual date string
    console.log('dayjsObject', dayjsObject); // Output: 2024-07-16

    const formattedDate = dayjsObject.format('YYYY-MM-DD'); // Change the format string as per your requirement
    props.setDate(formattedDate)
    console.log('two', selectedDate, formattedDate);
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
                    <DatePicker value={dayjsObject} onChange={handleDateChange} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
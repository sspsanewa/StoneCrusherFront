import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    // Add more options as needed
];

const SelectSearch = ({ options, setSelectedList }) => {
    const handleSelectedChange = (event, value) => {
        setSelectedList(value); // Assigning selected value(s) to setSelectedList
    };
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option}
            filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                )
            }
            onChange={handleSelectedChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Select multiple users"
                    placeholder="Search..."
                />
            )}
        />
    );
};

export default SelectSearch;

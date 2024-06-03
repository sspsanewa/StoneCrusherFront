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

const SelectSearchCategory = ({ options, setCategoryId }) => {
    const handleSelectedChange = (event, inputValue) => {
        setCategoryId(inputValue); // Assigning selected value(s) to setSelectedList
    };
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title}
            filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                    option.title.toLowerCase().includes(inputValue.toLowerCase())
                )
            }
            onChange={handleSelectedChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Select Category"
                    placeholder="Search..."
                />
            )}
        />
    );
};

export default SelectSearchCategory;

import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Console from '../debug_log';

const Dropdown = ({ options, label, setSelectedList }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
        setSelectedList(selectedOptions)
    };

    Console("selected", selectedOptions)

    return (
        <FormControl sx={{ width: '200px', marginLeft: '23px' }}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => selected.join(', ')}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;

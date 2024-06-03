import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Load from './Load';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate some asynchronous operation
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Change the timeout value as per your requirement

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box >
            {loading && <Load />}
        </Box>
    );
};

export default Loader;
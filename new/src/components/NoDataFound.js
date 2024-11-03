import React from 'react';

function NoDataFound() {
    const styles = {
        container: {
            textAlign: 'center',
            padding: '20px',
            color: '#555',
        },
        icon: {
            fontSize: '48px',
            marginBottom: '10px',
        },
        message: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        subMessage: {
            fontSize: '16px',
            color: '#888',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.icon}>📭</div>
            <h2 style={styles.message}>No Data Found</h2>
            <p style={styles.subMessage}>
                It looks like we couldn't find any data to display.
            </p>
        </div>
    );
}

export default NoDataFound;

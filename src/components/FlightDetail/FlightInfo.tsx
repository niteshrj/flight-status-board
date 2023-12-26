import React from 'react';
import {Grid, Typography} from '@mui/material';

export const FlightInfo: React.FC<FlightInfoRowProps> =
    ({
         label,
         value,
         coloredText = false,
         statusColor,
     }) => (
        <Grid item xs={12} sm={6}>
            <Typography variant="body1" style={{fontSize: '18px'}}>
                <strong>{label}:</strong>{' '}
                { coloredText
                    ? (<span
                        style={{
                            color: statusColor,
                            fontWeight: 'bold',
                            marginLeft: '5px',
                        }}
                    >
                    {value}
                    </span>)
                    : value
                }
            </Typography>
        </Grid>
    );

export interface FlightInfoRowProps {
    label: string;
    value: string;
    coloredText?: boolean;
    statusColor?: string;
}
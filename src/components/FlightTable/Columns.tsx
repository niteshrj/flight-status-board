import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {formatTime} from "../../utils/DateTimeFormatter";
import {getStatusColor} from "../Status";

export const columns: GridColDef[] = [
    { field: 'flightNumber', headerName: 'Flight Number', width: 200 },
    { field: 'airline', headerName: 'Airline', width: 200 },
    { field: 'origin', headerName: 'Origin', width: 200 },
    { field: 'destination', headerName: 'Destination', width: 160 },
    {
        field: 'departureTime',
        headerName: 'Departure Time',
        width: 250,
        align: 'center',
        headerAlign: 'center',
        valueGetter: (params: GridValueGetterParams) => {
            return formatTime(params.row.departureTime);
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        renderCell: (params: any) => {
            return (
                <span
                    style={{
                        color: getStatusColor(params.row.status),
                    }}
                >
                    {params.row.status}
                </span>
            );
        },
    },
];

import {Box, useTheme} from "@mui/material";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useGetAuthorsMutation} from "../../store/services/AuthorService";


const gridStyle = {
    height: 471,
    width: '100%'
};

const limit = 10;

export const AuthorGrid = () => {

    const column = [
        {
            valueFormatter: ({data}) => `${data?.surname || ''} ${data?.name || ''} ${data?.patronymic || ''}`.trim(),
            cellRenderer: 'loading',
            headerName: 'ФИО',
            initialFlex: 2,
            headerClass: 'ag-center-header',
            cellStyle: {
                textAlign: 'left'
            },
        },
        {
            valueFormatter: ({data}) => (data?.dateOfBirthday) && new Date(data?.dateOfBirthday).toLocaleDateString(),
            cellRenderer: 'loading',
            headerName: 'Дата рождения',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },
        {
            cellRenderer: 'loading',
            field: 'points',
            headerName: 'Очки',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },
        {
            cellRenderer: 'loading',
            field: 'rating',
            headerName: 'Рейтинг',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },
    ];

    const {palette: {mode}} = useTheme();
    const [getAuthors] = useGetAuthorsMutation();

    const datasource = {
        getRows: ({successCallback, startRow, endRow}) => {
            getAuthors({offset: startRow, limit})
                .then(({data}) => successCallback(data?.authors, data?.countAuthors));
        }

    };

    const components = {
        loading: (params) => (params.data) ?
            params?.value || params?.valueFormatted :
            <img src="https://www.ag-grid.com/example-assets/loading.gif"/>
    };

    const onGridReady = ({api}) => {
        api.setGridOption('datasource', datasource);
    };


    return (
        <Box
            className={(mode === "dark") ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
            sx={gridStyle}
        >
            <AgGridReact
                columnDefs={column}
                defaultColDef={{sortable: false}}
                rowModelType={'infinite'}
                onGridReady={onGridReady}
                cacheBlockSize={limit}
                components={components}
                maxBlocksInCache={10}
            />
        </Box>
    );
};
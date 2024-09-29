import {useEffect, useRef} from "react";
import {Box, useTheme} from "@mui/material";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-enterprise';
import {useGetBooksMutation} from "../../store/services/BookService";


const gridStyle = {
    height: 471,
    width: '100%'
};

const limit = 10;

export const BookGrid = ({editMode, setEditData}) => {

    const column = [
        {
            cellRenderer: 'loading',
            field: 'title',
            headerName: 'Название',
            initialFlex: 2,
            headerClass: 'ag-center-header',
            cellStyle: {
                textAlign: 'left'
            },
        },
        {
            valueFormatter: ({data}) => (data?.releaseDate) && new Date(data?.releaseDate).toLocaleDateString(),
            cellRenderer: 'loading',
            headerName: 'Дата релиза',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },

        {
            valueFormatter: ({data}) => (data?.price) && `${data?.price || 0} ₽`,
            cellRenderer: 'loading',
            headerName: 'Цена',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },
        {
            cellRenderer: 'loading',
            field: 'mark',
            headerName: 'Оценка',
            initialFlex: 1,
            headerClass: 'ag-center-header',
        },
        {
            valueFormatter: ({data}) => `${data?.author.surname || ''} ${data?.author.name || ''} ${data?.author.patronymic || ''}`.trim(),
            cellRenderer: 'loading',
            headerName: 'Автор',
            initialFlex: 1,
            headerClass: 'ag-center-header',
            cellStyle: {
                textAlign: 'left'
            },
        },
    ];

    const {palette: {mode}} = useTheme();
    const gridRef = useRef(null);
    const [getBooks] = useGetBooksMutation();

    const datasource = {
        getRows: ({successCallback, startRow}) =>
            getBooks({offset: startRow, limit})
                .then(({data}) => successCallback(data?.books, data?.countBooks))

    };

    const components = {
        loading: (params) => (params.data) ?
            params?.value || params?.valueFormatted :
            <img src="https://www.ag-grid.com/example-assets/loading.gif"/>
    };

    const onGridReady = ({api}) => {
        api.setGridOption('datasource', datasource);
    };

    const onSelectionChanged = ({api}) => {
        const selectedItem = api.getSelectedNodes()[0];
        if (selectedItem) {
            setEditData({
                id: selectedItem.data.id,
                title: selectedItem.data.title,
                releaseDate: selectedItem.data.releaseDate,
                price: selectedItem.data.price,
                mark: selectedItem.data.mark,
                authorId: selectedItem.data.author.id,
            });
        }
    };

    useEffect(() => {
        if (editMode === '') {
            const {api} = gridRef?.current;
            api?.refreshInfiniteCache();
        }
    }, [editMode]);

    return (
        <Box
            className={(mode === "dark") ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
            sx={gridStyle}
        >
            <AgGridReact
                ref={gridRef}
                columnDefs={column}
                defaultColDef={{sortable: false}}
                rowModelType={'infinite'}
                onGridReady={onGridReady}
                cacheBlockSize={limit}
                components={components}
                maxBlocksInCache={10}
                selection={(editMode === 'update' || editMode === 'delete') && {mode: 'singleRow'}}
                onSelectionChanged={onSelectionChanged}
            />
        </Box>
    );
};
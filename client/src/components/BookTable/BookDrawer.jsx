import {useEffect, useState} from "react";
import {Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation} from "../../store/services/BookService";
import {useGetShortListAuthorsQuery} from "../../store/services/AuthorService";

const drawerContainerStyle = {
    width: 400,
    mt: 8,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    '@media only screen and (max-width: 400px)': {
        width: window.innerWidth,
    }
};

const titleBlockStyle = {
    width: '100%',
    textAlign: 'left',
    fontSize: '27px'
};

const actionContainerBlockStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 3
};

const initialState = {
    title: false,
    releaseDate: false,
}

const minDate = new Date('1700-01-01')
const maxDate = new Date()

dayjs.extend(utc);

export const BookDrawer = ({isOpen, mode: editMode, data: editData, onClose}) => {

    const [mode, setMode] = useState(editMode);
    const [checkData, setCheckData] = useState(initialState)
    const [data, setDate] = useState(editData);
    const [createBook] = useCreateBookMutation();
    const [updateBook] = useUpdateBookMutation();
    const [deleteBook] = useDeleteBookMutation();
    const {data: authorData} = useGetShortListAuthorsQuery();


    const handleChangeTitle = (event) => {
        const value = event.target.value
        setDate((data) => ({
            ...data,
            title: value
        }));
        setCheckData((checkData) => ({
            ...checkData,
            title: !value
        }))
    };

    const handleChangeReleaseDate = (value) => {
        setDate((data) => ({
            ...data,
            releaseDate: (value)? new Date(value) : null
        }));
        setCheckData((checkData) => ({
            ...checkData,
            releaseDate: value && isNaN(new Date(value))
        }))
    };

    const handleChangePrice = (event) => {
        const value = event.target.value
        if (/^[0-9]*$/.test(value) && value < 1000000) {
            setDate((data) => ({
                ...data,
                price: (value)? value : null
            }));
        }
    };

    const handleChangeMark = (event) => {
        const value = event.target.value.replace(',', '.');
        if (/^[0-9]*$|^[0-9]*(?<=[0-9])[.]?[0-9]{0,2}$/.test(value) && value <= 100) {
            setDate((data) => ({
                ...data,
                mark: (value)? value : null
            }));
        }
    };

    const handleChangeAuthor = (event) => {
        const value = event.target.value
        setDate((data) => ({
            ...data,
            authorId: (value)? value : null
        }));
    };

    const checkValidData = () => {
        return (!checkData.title && data.title.length) &&
        (!data.releaseDate ||
            !checkData.releaseDate &&
            new Date(data?.releaseDate)?.getTime() >= minDate.getTime() &&
            new Date(data?.releaseDate)?.getTime() <= maxDate.getTime())
    }

    const handleCreateBook = () => {
        createBook({bookData: data});
        onClose();
    };

    const handleUpdateBook = () => {
        updateBook({id: editData?.id, bookData: data});
        onClose();
    };

    const handleDeleteBook = () => {
        deleteBook({id: editData?.id});
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setDate({
                title: editData.title,
                releaseDate: editData.releaseDate,
                price: editData.price,
                mark: editData.mark,
                authorId: editData.authorId,
            });
            setMode(editMode);
        }
    }, [isOpen]);

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor={'right'}
        >
            <Box
                sx={drawerContainerStyle}
            >
                <Box
                    sx={titleBlockStyle}
                >
                    {(mode === 'create') && 'Создание книги'}
                    {(mode === 'update') && 'Изменение книги'}
                    {(mode === 'delete') && 'Удаление книги'}
                </Box>
                <TextField
                    label={"Название"}
                    value={data.title}
                    onChange={handleChangeTitle}
                    multiline={true}
                    sx={{width: '100%'}}
                    disabled={mode === 'delete'}
                    error={checkData.title}
                    helperText={(checkData.title) && 'Поле названия должно быть заполнено'}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={"Дата релиза"}
                        value={(data.releaseDate) ? dayjs(data.releaseDate).utc(true) : null}
                        onChange={handleChangeReleaseDate}
                        format={'DD.MM.YYYY'}
                        sx={{width: '100%'}}
                        minDate={dayjs(minDate).utc(true)}
                        maxDate={dayjs(maxDate).utc(true)}
                        disabled={mode === 'delete'}
                        slotProps={{
                            textField: {
                                helperText: (checkData.releaseDate) && 'Некорректная дата',
                            },
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    label={"Цена"}
                    value={data.price || ''}
                    onChange={handleChangePrice}
                    sx={{width: '100%'}}
                    disabled={mode === 'delete'}
                />
                <TextField
                    label={"Оценка"}
                    value={data.mark || ''}
                    onChange={handleChangeMark}
                    sx={{width: '100%'}}
                    disabled={mode === 'delete'}
                />
                <FormControl>
                    <InputLabel>
                        Автор
                    </InputLabel>
                    <Select
                        label={"Автор"}
                        value={data.authorId || ''}
                        onChange={handleChangeAuthor}
                        sx={{width: '100%'}}
                        variant={'outlined'}
                        disabled={mode === 'delete'}
                    >
                        <MenuItem
                            key={0}
                            value={null}
                        >
                            &nbsp;
                        </MenuItem>
                        {(authorData) ?
                            authorData?.map((author) =>
                                <MenuItem
                                    key={author.id}
                                    value={author.id}
                                >
                                    {author?.surname || ''} {author?.name || ''} {author?.patronymic || ''}
                                </MenuItem> || null
                            ) : <></>}
                    </Select>
                </FormControl>
                <Box
                    sx={actionContainerBlockStyle}
                >
                    <Button
                        onClick={onClose}
                        variant={"contained"}
                    >
                        Отмена
                    </Button>
                    {(mode === 'delete') ?
                        <Button
                            onClick={handleDeleteBook}
                            variant={"contained"}
                            color={'error'}
                            startIcon={<DeleteIcon/>}
                        >
                            Удалить
                        </Button> :
                        <Button
                            onClick={(mode === 'create') ? handleCreateBook : handleUpdateBook}
                            variant={"contained"}
                            endIcon={<SendIcon/>}
                            disabled={!checkValidData()}
                        >
                            Сохранить
                        </Button>
                    }
                </Box>
            </Box>
        </Drawer>
    );

};
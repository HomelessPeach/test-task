import {useState} from "react";
import {Box, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {BookGrid} from "./BookGrid";
import {BookDrawer} from "./BookDrawer";

const containerStyle = {
    width: '100%',
    p: '2.5% 5%'
};

const titleContainerBlockStile = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 0',
};

const titleBlockStyle = {
    width: '100%',
    textAlign: 'left',
    fontSize: '30px'
};

const actionContainerBlockStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    gap: 2,
};

const initialEditData = {
    id: null,
    title: '',
    releaseDate: null,
    price: null,
    mark: null,
    authorId: null,
};

export const BookTable = ({header, label}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState('');
    const [editData, setEditData] = useState(initialEditData);

    const handleCreate = () => {
        setEditMode(editMode => (editMode !== 'create') ? 'create' : '');
        setIsOpen(true);
    };

    const handleUpdate = () => {
        setEditMode(editMode => (editMode !== 'update') ? 'update' : '');
    };

    const handleDelete = () => {
        setEditMode(editMode => (editMode !== 'delete') ? 'delete' : '');
    };

    const handleSetEditData = (data) => {
        setIsOpen(true);
        setEditData(data);
    };

    const handleOnClose = () => {
        setIsOpen(false);
        setEditMode('');
        setEditData(initialEditData);
    };

    return (
        <>
            <Box
                sx={containerStyle}
            >
                {(header || label) &&
                    <Box
                        sx={titleContainerBlockStile}
                    >
                        <Box
                            sx={titleBlockStyle}
                        >
                            {(typeof label === 'string') ? label : 'Книги'}
                        </Box>
                        <Box
                            sx={actionContainerBlockStyle}
                        >

                            <IconButton
                                onClick={handleCreate}
                                color={editMode === 'create' ? 'secondary' : 'primary'}
                            >
                                <AddIcon/>
                            </IconButton>
                            <IconButton
                                onClick={handleUpdate}
                                color={editMode === 'update' ? 'secondary' : 'primary'}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                onClick={handleDelete}
                                color={editMode === 'delete' ? 'secondary' : 'primary'}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                }
                <BookGrid
                    editMode={editMode}
                    setEditData={handleSetEditData}
                />
            </Box>
            <BookDrawer
                isOpen={isOpen}
                mode={editMode}
                data={editData}
                onClose={handleOnClose}
            />
        </>
    );
};
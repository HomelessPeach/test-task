import {Box} from "@mui/material";
import {BookTable} from "../components/BookTable";

const bookPageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1
}

export const Book = () => {
    return (
        <Box sx={bookPageContainerStyle}>
            <BookTable header={true}/>
        </Box>
    )
}
import {Box} from "@mui/material";
import {AuthorTable} from "../components/AuthorTable";

const authorPageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1
}

export const Author = () => {

    return (
        <Box sx={authorPageContainerStyle}>
            <AuthorTable header={true}/>
        </Box>
    );
};
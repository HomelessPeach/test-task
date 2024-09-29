import {Box} from "@mui/material";
import {AuthorTable} from "../components/AuthorTable";
import {BookTable} from "../components/BookTable";

const homePageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1
}

export const Home = () => {
    return (
        <Box sx={homePageContainerStyle}>
            <AuthorTable header={true}/>
            <BookTable header={true}/>
        </Box>
    );
};
import {Box} from "@mui/material";
import {AuthorGrid} from "./AuthorGrid";


const containerStyle = {
    width: '100%',
    p: '2.5% 5%'
};

const titleBlock = {
    width: '100%',
    textAlign: 'left',
    fontSize: '30px',
    padding: '10px 0'
};

export const AuthorTable = ({header, label}) => {

    return (
        <Box sx={containerStyle}>
            {(header || label) &&
                <Box sx={titleBlock}>
                    {(typeof label === 'string') ? label : 'Авторы'}
                </Box>
            }
            <AuthorGrid/>
        </Box>
    );
};
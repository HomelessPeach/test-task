import {useMemo} from "react";
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import {StyledEngineProvider} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {RouteNames} from "./index";


export const Dashboard = () => {

    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Меню',
        },
        {
            segment: RouteNames.HOME.replace('/', ''),
            title: 'Дашборд',
            icon: <DashboardIcon/>,
        },
        {
            kind: 'divider',
        },
        {
            segment: RouteNames.AUTHOR.replace('/', ''),
            title: 'Авторы',
            icon: <PersonIcon/>,
        },
        {
            segment: RouteNames.BOOK.replace('/', ''),
            title: 'Книги',
            icon: <BookIcon/>,
        },
    ];

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const router = useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => navigate(path),
        };
    }, [pathname]);


    return (
        <StyledEngineProvider
            injectFirst={true}
        >
            <AppProvider
                navigation={NAVIGATION}
                router={router}
                branding={{title: "Index"}}
            >
                <DashboardLayout>
                    <Outlet/>
                </DashboardLayout>
            </AppProvider>
        </StyledEngineProvider>
    );
};
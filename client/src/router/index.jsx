import {Routes, Route} from "react-router-dom";
import {Home} from "../pages/Home";
import {Author} from "../pages/Author";
import {Book} from "../pages/Book";
import {NotFound} from "../pages/NotFound";
import {Dashboard} from "./Dashboard";

export const RouteNames = {
    HOME: '/',
    AUTHOR: '/author',
    BOOK: '/book',
    NOT_FOUND: '/*'
}

export const Router = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Dashboard/>}>
                <Route index element={<Home/>}/>
                <Route path={RouteNames.AUTHOR} element={<Author/>}/>
                <Route path={RouteNames.BOOK} element={<Book/>}/>
                <Route path={RouteNames.NOT_FOUND} element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}
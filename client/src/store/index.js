import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authorAPI} from "./services/AuthorService";
import {bookAPi} from "./services/BookService";

const rootReducer = combineReducers({
    [authorAPI.reducerPath]: authorAPI.reducer,
    [bookAPi.reducerPath]: bookAPi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                authorAPI.middleware,
                bookAPi.middleware,
            )
});

setupListeners(store.dispatch);
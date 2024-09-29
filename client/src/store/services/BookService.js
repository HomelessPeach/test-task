import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const bookAPi = createApi({
    reducerPath: 'bookAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/book`
    }),
    endpoints: (build) => ({
        getBooks: build.mutation({
            query: ({offset = 0, limit = 10}) => ({
                url: `/`,
                method: 'GET',
                params: {
                    offset,
                    limit,
                }
            })
        }),
        createBook: build.mutation({
            query: ({bookData}) => ({
                url: `/`,
                method: 'POST',
                body: bookData
            })
        }),
        updateBook: build.mutation({
            query: ({id, bookData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: bookData
            })
        }),
        deleteBook: build.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetBooksMutation,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookAPi;
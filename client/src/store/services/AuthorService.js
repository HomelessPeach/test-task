import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";


export const authorAPI = createApi({
    reducerPath: 'authorAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/author`
    }),
    endpoints: (build) => ({
        getAuthors: build.mutation({
            query: ({offset = 0, limit = 10}) => ({
                url: `/`,
                method: 'GET',
                params: {
                    offset,
                    limit,
                }
            })
        }),
        getShortListAuthors: build.query({
            query: () => ({
                url: `/shortlist`,
                method: 'GET',
            })
        }),
    })
});

export const {
    useGetAuthorsMutation,
    useGetShortListAuthorsQuery
} = authorAPI;
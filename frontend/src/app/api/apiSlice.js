import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base } from '../../../../backend/models/User';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['User'],
    endpoints: builder => ({}),
});

    
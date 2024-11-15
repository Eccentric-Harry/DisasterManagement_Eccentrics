import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base } from '../../../../backend/models/User';

export const apiSlice = createApi({
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://disaster-management-frontend-gray.vercel.app/' }),
    tagTypes: ['User'],
    endpoints: builder => ({}),
});

    
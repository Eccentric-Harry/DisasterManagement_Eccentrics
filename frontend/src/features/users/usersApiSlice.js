import {
    createSelector,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userSelectors = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user =>{
                    user.id = user._id;
                    return user;
                });
                return userAdapter.setAll(initialState, loadedUsers);
            },
            providedTags: (result, error, arg) => {
                if (result?.ids){
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id})),
                    ]
                }else return [{type: 'User', id: 'LIST'}]
            }
        }),
    }),
}).selectors;

export const {
    userGetUsersQuery,
} = userApiSlice;

// return the query result object
export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

// creates memorized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => userResult.data //normalized state objects with states and entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // pass a selector that returns the users slice of the state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
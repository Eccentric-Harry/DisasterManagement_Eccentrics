// import { useGetUsersQuery } from './usersAPI';
// import User from './User'
// const UsersList = () => {
//   const {
//     data:users,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   } = useGetUsersQuery();

//   let content

//   if(isLoading){
//     content = <div>Loading...</div>
//   }

//   if(isError){
//     content = <div>{error}</div>
//   }

//   if (isSuccess){
//     const {ids} = users;

//     const tableContent = ids.length
//       ? ids.map(userId => <User key = {userId} userId = {userId}/>)
//       : null;

//     content = (
//       // <ul>
//       //   {users.map(user => (
//       //     <li key={user.id}>{user.name}</li>
//       //   ))}
//       // </ul>

//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Roles</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableContent}
//         </tbody>
//       </table>
//     )
//   }

//   return content;
// }

// export default UsersList;
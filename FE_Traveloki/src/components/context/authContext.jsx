// import { createContext, useState} from 'react';

// export const AuthContext = createContext({
//     isAuthenticated: false,
//     user: {
//         username: '',
//         mail: '',
//     }
// })

// export const AuthWrapper = (props) => {
//     const [user, setUser] = useState({
//         isAuthenticated: false,
//         user: {
//             username: '',
//             mail: '',
//         }
//     });

//     return (
//         <AuthContext.Provider value={{user, setUser}}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

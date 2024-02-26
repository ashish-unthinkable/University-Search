// import React, { useCallback} from 'react'
// import { NavLink,   useNavigate } from "react-router-dom";

// import { PATCH } from "../../API";
// import { serverUrl } from '../../Constant';

// import "./header.css";

// function Header({isLoggedIn, setIsLoggedIn}) {
//   const navigate = useNavigate();

//   const handleLogout = useCallback(()=>  async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user")).id; //TODO
//       if (userId) {
//         await PATCH(serverUrl + `/${userId}`, {
//           login:false,
//         })
//       }

//       // Clear localStorage
//       localStorage.removeItem('user');
//       setIsLoggedIn(false);

//       // Navigate to the login page
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during logout:", error.message);
//     }
//   },[])

//   return (
//       <nav>
//         {/* Use img, div(instead of ul,li) */}
//         <span className="logo"/>

//         <ul className="links">
//           <li>
//             <NavLink to="/search">Search</NavLink>
//           </li>

//           <li>
//             <NavLink to="/">Profile</NavLink>
//           </li>

//           <li>
//             {isLoggedIn ? <NavLink to="/login" onClick={handleLogout()}>
//               Logout
//             </NavLink> : null}
//           </li>

//         </ul>
//       </nav>
//   );
// }

// export default Header;

import React, { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import { getUser, updateUser } from "../../feature/userFeature";
import logo from "../../assets/logo.png";
import "./header.css";
// import { useAuth } from "../../AuthProvider";

const Header = () =>  {

  // const { user, updateUser } = useAuth();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      // Clear localStorage
      localStorage.removeItem("user");
      dispatch(updateUser(null));

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  }, [updateUser]);

  return (
    <nav>
      <img src={logo} alt="Company's Logo" className="logo" />

      <div className="links">
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/">Profile</NavLink>
        {user ? (
          <NavLink to="/login" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;

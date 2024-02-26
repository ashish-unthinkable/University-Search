// import React, { useEffect, useState, useCallback, useMemo } from "react";

// import "./profile.css";
// import { universityUrl, countryUrl } from "../../Constant";
// import UniversityCard from "../UniversityCard/UniversityCard";
// import UniversityDetail from "../UniversityDetail/UniversityDetail";
// import { GET } from "../../API";

// const Profile = () => {
//   const [user, setUser] = useState(); // logged in user
//   const [bookmarkedUniversity, setBookmarkedUniversity] = useState([]); // user university
//   const [university, setUniversity] = useState(); // university in focus
//   const [country, setCountry] = useState(); // university's country

//   const fetchUserData = useCallback(()=> async () => {
//     try {
//       const userinLS = JSON.parse(localStorage.getItem("user"));
//       setUser(userinLS);
//       setBookmarkedUniversity(userinLS.university);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }, [])

//   const fetchedData = useMemo(()=>{
//     fetchUserData()();
//   }, [localStorage.getItem("user")])

//   const fetchData = useCallback(()=>
//     async (name) => {
//     try {
//       const response = await GET(
//         universityUrl+name
//       );
//       const univData = response.data;
//       setUniversity((prev) => (prev = univData[0]));

//       // load univeristy's country
//       const response2 = await GET(
//         countryUrl + `/${univData[0].country}`
//       );
//       const exactCountry = response2.data.filter((res) => {
//         return res.name.common === univData[0].country;
//       });
//       setCountry((prev) => (prev = exactCountry));
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     }
//   },[])

//   const show = (university) => {
//     fetchData()(university.name);
//   }

//   return (
//     <div className="profileContainer">
//       <div className="favorites">
//         <div className="title">My favorites</div>
//         {bookmarkedUniversity &&
//           bookmarkedUniversity.map((university, index) => {
//             return (
//               <UniversityCard
//                 key={index}
//                 university={university}
//                 setUniversity={setUniversity}
//                 setCountry={setCountry}
//                 showIcons={true}
//                 isBookmarked={true}
//                 user={user}
//                 setUser={setUser}
//                 show={show}
//               />
//             );
//           })}
//       </div>

//       <div className="selectedUniversity">
//         <div className="title">Selected University</div>
//         {university && country && (
//           // <div className="universityDetails">
//             <UniversityDetail university={university} country={country} />
//           // </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { GET } from "../../API";
import { universityUrl, countryUrl } from "../../Constant";
import UniversityCard from "../UniversityCard/UniversityCard";
import UniversityDetail from "../UniversityDetail/UniversityDetail";
import "./profile.css";
// import { useAuth } from "../../AuthProvider";

const Profile = () => {
  // const { user } = useAuth();
  const user = useSelector(state => state.user);
  const [bookmarkedUniversity, setBookmarkedUniversity] = useState([]); // user university
  const [selectedUniversity, setSelectedUniversity] = useState(); // university in focus
  const [country, setCountry] = useState(); // university in focus' country
  useEffect(() => {
    (()=>{
      try {
        setBookmarkedUniversity(user?.university);
      } catch (error) {
        console.error("Error fetching user university list:", error.message);
      }
    })()
  }, [user]);
  
  const showUniversityData = useCallback((university) => 
    async () => {
      try {
        const universityName = university.name;
        const universityResponse = await GET(
          universityUrl + `${universityName}`
        );
        const universityData = universityResponse.data[0];
        setSelectedUniversity(universityData);

        // load university's country
        const countryResponse = await GET(
          countryUrl + `/${universityData.country}`
        );
        const countryData = countryResponse.data;
        const exactCountry = countryData.filter((res) => {
          return res.name.common === universityData.country;
        })[0];
        setCountry(exactCountry);
      } catch (error) {
        console.error("Error fetching user university data:", error.message);
      }
    },
    [universityUrl, countryUrl]
  );


  return (
    <div className="profileContainer">
      <div className="favorites">
        <div className="title">My favorites</div>
        {bookmarkedUniversity &&
          bookmarkedUniversity.map((university, index) => {
            return (
              <UniversityCard
                key={index.toString() + university.name}
                university={university}
                showIcons={true}
                isBookmarked={true}
                showUniversity={showUniversityData}
              />
            );
          })}
      </div>

      <div className="selectedUniversity">
        <div className="title">Selected University</div>
        {selectedUniversity && country && (
          <UniversityDetail university={selectedUniversity} country={country} />
        )}
      </div>
    </div>
  );
};

export default Profile;

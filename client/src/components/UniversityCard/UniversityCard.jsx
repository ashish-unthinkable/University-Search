import React, { useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux';

import { serverUrl } from "../../Constant";
import { PATCH } from "../../API";
import { CiBookmark } from "react-icons/ci";
import { FaExternalLinkSquareAlt, FaBookmark } from "react-icons/fa";
import "./UniversityCard.css";
// import { useAuth } from "../../AuthProvider";
import {updateUser} from '../../feature/userFeature'

const UniversityCard = ({
  university,
  isBookmarked,
  showUniversity,
  showIcons,
}) => {
  // const {user, updateUser} = useAuth();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleBookmark = useCallback(
    (university) => async () => {
      const updatedUniversityList = [...user?.university];
      const isBookmarked = updatedUniversityList.some(
        (item) => item.name === university.name
      );

      // Remove bookmark
      if (isBookmarked) {
        const index = updatedUniversityList.findIndex(
          (item) => item.name === university.name
        );
        updatedUniversityList.splice(index, 1);
      }
      // Add bookmark
      else {
        updatedUniversityList.push({
          name: university.name,
          country: university.country,
          isBookmarked: true,
        });
      }
      
      
      try {
        await PATCH(serverUrl + `/${user?.id}`, {
          university: updatedUniversityList,
        });
        const updatedUser = {...user};
        updatedUser.university = updatedUniversityList;
        // console.log("Updated User", updatedUser)
        dispatch(updateUser(updatedUser))
      } catch (error) {
        console.error(error.messgae);
      }
    },
    [user, dispatch]
  );

  return (
    <div className="container">
      <div className="title-country">
        <span className="universityName">{university.name}</span>
        <span>&nbsp;&nbsp;&nbsp;{university.country}</span>
      </div>
      {showIcons && (
        <div className="icons">
          <span onClick={handleBookmark(university)}>
            {isBookmarked ? <FaBookmark /> : <CiBookmark />}
          </span>
          <span>
            <FaExternalLinkSquareAlt onClick={showUniversity(university)} />
          </span>
        </div>
      )}
    </div>
  );
};

export default UniversityCard;

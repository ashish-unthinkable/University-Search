import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GET } from "../../API";
import { countryUrl } from "../../Constant";
import Input from "../Input.jsx/Input";
import UniversityCard from "../UniversityCard/UniversityCard";
import UniversityDetail from "../UniversityDetail/UniversityDetail";
import {
  updateStatus,
  getUniversityAPIStatus,
  getUniversitySuggestions,
  fetchUniversity,
} from "../../feature/suggestionsUniversityFeature";
import "./search.css";
import { debounce } from "../../Utilities/Debounce";
// import { useAuth } from "../../AuthProvider";
// import { UseDispatch } from "react-redux";

function Search() {
  // const { user } = useAuth();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const universitySuggestions = useSelector(getUniversitySuggestions);
  const universityAPIStatus = useSelector(getUniversityAPIStatus);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsArray, setSuggestionsArray] = useState([]);
  const [university, setUniversity] = useState(); // university in focus
  const [country, setCountry] = useState(); // university's country
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (universityAPIStatus === "fulfilled") {
      setSuggestions(universitySuggestions);
    } else if (universityAPIStatus === "idle") {
      setSuggestions([]);
    }
  }, [universityAPIStatus]);

  const handleOnChange = useCallback(
    (event) => {
      const input = event.target.value;
      setInputValue(input);
      if (input.length) {
        dispatch(fetchUniversity(input));
      } else {
        setSuggestions([]);
      }
    },
    [fetchUniversity]
  );

  const handleSearch = useCallback(() => {
    const input = inputValue;
    if (input.length) {
      setSuggestionsArray(universitySuggestions);
      dispatch(updateStatus("idle"));
    }
  }, [universitySuggestions, inputValue]);

  // If user clicks on suggestion
  const handleSuggestionSearch = useCallback(
    (inputUniversity) => () => {
      setInputValue(inputUniversity.name);
      setSuggestionsArray([inputUniversity]); // wrap object into array
      dispatch(updateStatus("idle"));
    },
    [updateStatus]
  );

  const optimisedHandleOnChange = useCallback(debounce(handleOnChange, 800), [
    handleOnChange,
  ]);

  const fetchCountry = useCallback(
    (university) => async () => {
      const countryResponse = await GET(countryUrl + `/${university.country}`);
      const exactCountry = countryResponse?.data.filter((res) => {
        return res.name.common === university.country;
      });
      setUniversity(university);
      setCountry(exactCountry[0]);
    },
    []
  );

  return (
    <>
      <div className="searchBox">
        <div className="searchBar">
          <Input
            class="searchInput"
            type="text"
            placeholder="Enter University"
            required={false}
            onChange={optimisedHandleOnChange}
          />
          <span className="search-icon" onClick={handleSearch}>
            &#128269;
          </span>
        </div>
        {suggestions?.length ? (
          <div className="suggestions">
            {suggestions.map((university, index) => {
              return (
                <div
                  key={index.toString() + university.name} // some univ have same name in the api
                  onClick={handleSuggestionSearch(university)}
                >
                  <UniversityCard university={university} showIcons={false} />
                </div>
              );
            })}
          </div>
        ) : null}

        {suggestionsArray?.map((university, index) => {
              return (
                <div
                  className="suggestionsArray"
                  key={index.toString() + university.name}
                >
                  <div>
                    <UniversityCard
                      university={university}
                      showIcons={true}
                      isBookmarked={user?.university?.some(
                        (userUniv) => userUniv.name === university.name
                      )}
                      showUniversity={fetchCountry}
                    />
                  </div>
                </div>
              );
            })}
        {university && country && (
          <div className="universityData">
            <UniversityDetail university={university} country={country} />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

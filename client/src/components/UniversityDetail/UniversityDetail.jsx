import { Link } from "react-router-dom";

import './UniversityDetail.css'

// university and country are objects
const UniversityDetail = ({university, country}) => {

  return (
    <>
    <div className="universityDetails">
      <div className="universityTitle">{university?.name}</div>
          <div className="para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam hic
            deserunt, blanditiis sequi quas commodi quaerat molestias
            repellendus similique cumque nesciunt dolores cum assumenda aliquam?
            Fugit ex sapiente, dolor harum in sequi odio libero rem? Dolor,{" "}
          </div>
          <div className="country">
            Location :&nbsp; <span>{university?.country} {university?.alpha_two_code}</span>
          </div>
          <div className="website">
            Website :&nbsp; 
            <span><Link to={`${university?.web_pages}`} target="__blank">{university?.web_pages}
            </Link></span>
          </div>
          <div className="capital">
            Capital :&nbsp;
            {country?.capital &&
              country.capital.map((capitalItem, index) => {
                return <span key={index}>{capitalItem}</span>;
              })}
          </div>
          <div className="currency">
            Currency :&nbsp;
            {country?.currencies &&
              Object.keys(country.currencies).map((key) => {
                return (
                  <span key={key}>
                    {country.currencies[key].name} (
                    {country.currencies[key].symbol})
                  </span>
                );
              })}
          </div>
          <div className="language">
            Language :&nbsp;
            {country?.languages &&
              Object.keys(country.languages).map((key) => {
                return <span key={key}>{country.languages[key]} </span>;
              })}
          </div>
          <div className="population">
            Population :&nbsp;
            {country.population && <span>{country.population} </span>}
          </div>
    </div>
        
    </>
  )
}

export default UniversityDetail
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Geo_laocation";
// import App from "./currencey_converter";
// import StarRating from "./StarRating2";
// import App from "./text-expander";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" onSetRating={setMovieRating} />
//       <p>This Movie was rated {movieRating} stars.</p>
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} />
    <StarRating
      size={24}
      color="red"
      className="test"
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <Test /> */}
    {/* <StarRating
      maxRating={5}
      messages={[
        "Terrible", // 1
        "Poor", // 2
        "Average", // 3
        "Good", // 4
        "Amazing", // 5
      ]}
    />
    <StarRating maxRating={6} size={24} color="#000" className="test" />

    <StarRating
      maxRating={6}
      size={24}
      color="#000"
      className="test"
      defaultRating={3}
    /> */}
    {/* <Test /> */}
    <App />
  </React.StrictMode>
);

import "./styles.css";
import { useEffect, useState } from "react";
import { getDogs } from "./dogapi";

// Author: Leanne Zhang
// Interview Pratice

// 1. Create API response and fetch API
// 2. Clean up the response into title and url
// 3. Fetch data using useEffect and setData and loading state
// 4. Create html
// 5. Show all images
// 6. Get click handler to update active index
// 7. Show just one image
// 8. Add css,  fade animation

export default function App() {
  const [data, setData] = useState([{ title: "", url: "" }]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getDogs()
      .then((data) => {
        setData(data);
        setLoading(false);
        // throw new Error();
      })
      .catch(() => {
        setError("There is an error loading, please try again");
      });
  }, [setActiveIndex]);

  const handlePrev = () => {
    if (activeIndex >= 1 && activeIndex < data.length) {
      let prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex >= 0 && activeIndex < data.length - 1) {
      let nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  };

  const Error = () => {
    return <h3>{error}</h3>;
  };

  const Carousel = () => {
    const { title, url } = data[activeIndex];
    return (
      <div>
        <div className="CarouselContainer">
          <div className="ImageContainer">
            <img src={url} alt={title} className="fade" />
          </div>
        </div>
        <NavigationControls />
      </div>
    );
  };
  const NavigationControls = () => {
    return (
      <div className="BottomContainer">
        <button
          className="PrevButton"
          onClick={() => handlePrev()}
          disabled={activeIndex === 0}
        >
          Previous
        </button>
        <div className="DescriptionContainer">{data[activeIndex]?.title}</div>
        <button
          className="NextButton"
          onClick={() => handleNext()}
          disabled={activeIndex === data.length - 1}
        >
          Next
        </button>
      </div>
    );
  };
  return (
    <div className="App">
      {loading ? "loading..." : error ? <Error /> : <Carousel />}
    </div>
  );
}

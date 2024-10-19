import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import play from "../../assets/play-button-arrowhead.png";
import cheklist from "../../assets/cheklist.svg";
import arrowDown from "../../assets/KeyboardArrowDown.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieListCard.css";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { MovieListContext } from "../../MovieListContext";
import { Link } from "react-router-dom";

export default function MovieListCard({ judul, catagory }) {
  const [apiData, setApiData] = useState([]);
  const [isHover, setIsHover] = useState(null);
  const [genres, setGenres] = useState([]);
  const sliderRef = useRef(null);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2NhMjY0YzEwNDlkMmZlNjk2YzM1MzcyZmE2MWFhMyIsIm5iZiI6MTcyMTg3MDk0NC4wNDU1NjcsInN1YiI6IjY2YTA0NTcwMDJhOTk2MGU5NjBhNmZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmfCeOd8Bt1aCllUtobNXqIeG-FWkmNkvezwPedhEHo",
    },
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          options
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            catagory ? catagory : "popular"
          }?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, [catagory]);

  const getGenreNames = (genreIds) => {
    const genreNames = genreIds.slice(0, 2).map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    });
    return genreNames.map((name) => <li key={name}>{name}</li>);
  };

  const handleMouseEnter = (index) => {
    setIsHover(index);
  };

  const handleMouseLeave = () => {
    setIsHover(null);
  };


  const { addToMyList } = useContext(MovieListContext);

  const handleAddToMyList = (movie) => {
    addToMyList(movie);
  };

  return (
    <div className="movie-list-title">
      <h2 className="title">{judul}</h2>
      <div className="movie-list">
        <Slider {...settings} ref={sliderRef}>
          {apiData.map((card, index) => (
            <Link
              to={`/detail/${index}`}
              state={{ movie: card, category: catagory }}
              className="card-container"
              key={`list${index}`}
            >
              <motion.div
                layout
                key={`list${index}`}
                className="card-container"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div className="card-list">
                  <motion.img
                    src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                    style={{
                      opacity: isHover === index ? "0" : "1",
                    }}
                    className="image-contain"
                  />
                  <AnimatePresence>
                    {isHover === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.3 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="hover-card"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                          className="image-hover"
                        />
                        <div className="frame-82">
                          <div className="frame-77">
                            <div className="frame-78">
                              <button>
                                <img src={play} alt="play" />
                              </button>
                              <div
                                className="frame-71"
                                onClick={() => handleAddToMyList(card)}
                              >
                                <img src={cheklist} alt="cheklist" />
                              </div>
                            </div>
                            <div className="frame-71">
                              <img src={arrowDown} alt="dropdown" />
                            </div>
                          </div>
                          <div className="frame-75">
                            <span className="age">13+</span>
                            <p>{card.title}</p>
                          </div>
                          <ul className="frame-76">
                            {getGenreNames(card.genre_ids)}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

MovieListCard.propTypes = {
  judul: PropTypes.string.isRequired,
  catagory: PropTypes.string,
};

import { motion } from "framer-motion";
import star from "../../assets/star.svg";
import Slider from "react-slick";
import play from "../../assets/play-button-arrowhead.png";
import cheklist from "../../assets/cheklist.svg";
import arrowdown from "../../assets/KeyboardArrowDown.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./cardContinueWatching.css";
import { useEffect } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "./seekBar";

export default function CardContinueWatching() {
  const [apiData, setApiData] = useState([]);
  const [isHover, setIsHover] = useState(null);
  const [genres, setGenres] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2NhMjY0YzEwNDlkMmZlNjk2YzM1MzcyZmE2MWFhMyIsIm5iZiI6MTcyMTc4MDMxMi45NDU0MzMsInN1YiI6IjY2YTA0NTcwMDJhOTk2MGU5NjBhNmZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eUtQMEEhn_tDG_sYH9YU9JEuOhOWBUK1m9MlF8SfRQ4",
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
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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
  }, []);

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

  return (
    <div className="card-continue-title">
      <h2>Melanjutkan Tonton Film</h2>
      <div className="card-continue-list">
        <Slider {...settings}>
          {apiData.map((card, index) => {
            return (
              <div
                className="card-continue"
                key={`list${index}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="content"
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                />
                <div className="judul">
                  <h3>{card.original_title}</h3>
                  <span className="rating">
                    <img src={star} />
                    {card.vote_average}
                  </span>
                </div>

                <AnimatePresence>
                  {isHover === index && (
                    <motion.div
                      className="card-hover"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={
                          `https://image.tmdb.org/t/p/w500` + card.backdrop_path
                        }
                        alt=""
                      />
                      <div className="frame-821">
                        <div className="frame-771">
                          <div className="frame-781">
                            <button type="button">
                              <img src={play} alt="" />
                            </button>
                            <div className="check">
                              <img src={cheklist} alt="" />
                            </div>
                          </div>
                          <div className="frame-711">
                            <img src={arrowdown} alt="" />
                          </div>
                        </div>
                        <div className="frame-751"><ProgressBar/> <p>2j 33m</p></div>
                        <div className="frame-752"></div>
                        <ul className="frame-761">
                        {getGenreNames(card.genre_ids)}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

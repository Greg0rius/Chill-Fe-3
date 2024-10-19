import "./Detail.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MovieListContext } from "../../MovieListContext";
import {
  auth,
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../../firebase";
import Navbar from "../../components/navbar/navbar";
import add from "../../assets/plus-solid.svg";
import dlt from "../../assets/delete.png";

function Detail() {
  const { index } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(location.state?.movie || null);
  const category = location.state?.category;
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const { myList } = useContext(MovieListContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchBookmarks(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchBookmarks = async (userId) => {
    try {
      const userBookmarks = await getBookmarks(userId);
      setBookmarks(userBookmarks);
      const isMovieInList = userBookmarks.some((item) => item.id === movie?.id);
      setIsAdded(isMovieInList);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    if (!movie && category) {
      const fetchMovie = async () => {
        let apiUrl = "";

        switch (category) {
          case "popular":
            apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
            break;
          case "top_rated":
            apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
            break;
          case "upcoming":
            apiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
            break;
          default:
            navigate("/", { replace: true });
            return;
        }

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2NhMjY0YzEwNDlkMmZlNjk2YzM1MzcyZmE2MWFhMyIsIm5iZiI6MTcyMTg3MDk0NC4wNDU1NjcsInN1YiI6IjY2YTA0NTcwMDJhOTk2MGU5NjBhNmZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmfCeOd8Bt1aCllUtobNXqIeG-FWkmNkvezwPedhEHo",
            },
          });
          const data = await response.json();
          setMovie(data.results[index]);
        } catch (error) {
          console.error("Error fetching movie:", error);
          navigate("/", { replace: true });
        }
      };

      fetchMovie();
    }
  }, [movie, category, index, navigate]);

  const handleButtonClick = async () => {
    if (!user) return;
    const isMovieInList = bookmarks.some((item) => item.id === movie.id);
    if (isMovieInList) {
      await removeBookmark(user.uid, movie.id);
      setPopupMessage("Dihapus dari Daftar Saya!");
    } else {
      await addBookmark(user.uid, movie);
      setPopupMessage("Berhasil ditambahkan ke Daftar Saya!");
    }

    // Tampilkan popup
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    setIsAdded(!isMovieInList);
    fetchBookmarks(user.uid);
  };

  return (
    <div className="detail">
      {movie ? (
        <>
          <Navbar />
          <div className="detail-hero">
            <img
              className="detail-banner"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="sinopsis-container">
              <h1>{movie.title}</h1>
              <div className="teks">
                <p>release date : {movie.release_date}</p>
                <p>{movie.overview}</p>
              </div>
              <div className="container-detail-button">
                <div className="frame-detail-button">
                  <button className="btn"> Mulai </button>
                  <button className="btn dark-btn" onClick={handleButtonClick}>
                    <img src={isAdded ? dlt : add} alt="" className="plus" />
                    {isAdded
                      ? "Hapus dari Daftar Saya"
                      : "Tambahkan ke Daftar Saya"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popup notifikasi */}
          {showPopup && (
            <div className="popup">
              <p>{popupMessage}</p>
            </div>
          )}
        </>
      ) : (
        <h1>Terjadi Kesalahan</h1>
      )}
    </div>
  );
}

export default Detail;

import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import "./daftarsaya.css";
import { useContext, useEffect, useState } from "react";
import { MovieListContext } from "../../MovieListContext";
import { useNavigate } from "react-router-dom";
import { auth, getBookmarks } from "../../firebase";

function Mylist() {
  const { myList, addToMyList, removeFromMyList } = useContext(MovieListContext);
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const fetchedBookmarks = await getBookmarks(user.uid);
        setBookmarks(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [navigate]);

  // Fungsi untuk navigasi ke halaman detail ketika gambar di klik
  const goToDetail = (movie) => {
    navigate(`/detail/${movie.id}`, { state: { movie, category: "mylist" } });
  };

  // Fungsi untuk menangani klik tombol dinamis (tambah atau hapus)
  const handleButtonClick = (movie) => {
    const isMovieInList = myList.some((item) => item.id === movie.id);
    if (isMovieInList) {
      removeFromMyList(movie.id); // Hapus dari Daftar Saya
    } else {
      addToMyList(movie); // Tambahkan ke Daftar Saya
    }
  };

  return (
    <>
      <Navbar />
      <div className="mylist">
        <div className="my-list-container">
          {bookmarks.length > 0 ? (
            bookmarks.map((movie, index) => (
              <div key={index} className="my-list-item">
                {/* Klik gambar untuk navigasi ke halaman detail */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() => goToDetail(movie)}
                  className="movie-thumbnail"
                />
              </div>
            ))
          ) : (
            <p>Belum ada film yang ditambahkan.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mylist;

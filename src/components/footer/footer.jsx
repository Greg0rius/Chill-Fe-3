import { useRef } from "react";
import Logo from "../../assets/Logo.svg";
import arrowRight from "../../assets/chevron-right.svg";
import "./footer.css";

function Footer() {
  const containerGenreRef = useRef();
  const containerBantuanRef = useRef();

  function handleGenre() {
    const element = containerGenreRef.current;
    if (element) {
      element.classList.toggle("visible");
    }
  }

  function handleBantuan() {
    const element = containerBantuanRef.current

    if (element) {
      element.classList.toggle("visible")
    }
  }

  return (
    <div className="container-footer">
      <div className="Frame-1000002280">
        <div className="Frame-1000004495">
          <img src={Logo} alt="" className="logo-footer" />
          <span className="copy-right">@2024 Chill All Rights Reserved.</span>
        </div>
        <div className="Frame-1155">
          <div className="Frame-1145">
            <div className="frame-1145-head">
              <h4 className="title-genre">Genre</h4>
              <span className="arrow-left" onClick={handleGenre}>
                <img src={arrowRight} alt=">" />
              </span>
            </div>
            <div className="container-genre" ref={containerGenreRef}>
              <ul className="list-genre">
                <li>Aksi</li>
                <li>Anak-anak</li>
                <li>Anime</li>
                <li>Britania</li>
              </ul>
              <ul className="list-genre">
                <li>Drama</li>
                <li>Fantasi Ilmiah & Fantasi</li>
                <li>Kejahatan</li>
                <li>KDrama</li>
              </ul>
              <ul className="list-genre">
                <li>Komedi</li>
                <li>Petualangan</li>
                <li>Perang</li>
                <li>Romantis</li>
              </ul>
              <ul className="list-genre">
                <li>Sains & Alam</li>
                <li>Thriller</li>
              </ul>
            </div>
          </div>
          <div className="Frame-1145">
            <div className="frame-1145-head">
              <h4 className="title-genre">Bantuan</h4>
              <span className="arrow-left" onClick={handleBantuan}>
                <img src={arrowRight} alt=">" />
              </span>
            </div>
            <div className="container-genre" ref={containerBantuanRef}>
              <ul className="list-genre">
                <li>FAQ</li>
                <li>Bantu Kami</li>
                <li>Privasi</li>
                <li>Syarat dan Ketentuan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

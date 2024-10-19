/* eslint-disable react/no-unescaped-entities */
import myImage from "../../assets/type=1.jpg";
import informationGuide from "../../assets/information guide.svg"
import "./hero.css"

export default function Hero() {
  return (
    <div className="frame-57">
      <img src={myImage} className="banner-img" />
      <div className="frame-58">
        <div className="sinopsis">
          <h1>One Piece </h1>
          <div className='sinopsis-teks'>
            One Piece menceritakan tentang petualangan seorang anak bernama
            Monkey D. Luffy yang bercita-cita menjadi raja bajak laut dan
            menemukan "One Piece" setelah terinspirasi oleh Shanks. Sekitar 22
            tahun sebelum cerita dimulai, seorang bajak laut bernama Gol D.
            Roger, atau lebih dikenal sebagai raja bajak laut dieksekusi mati di
            depan publik. Tepat sebelum kematiannya, ia mengumumkan kepada orang
            banyak tentang harta miliknya, One Piece, yang diklaim sebagai harta
            terbesar yang pernah ada.
          </div>
        </div>
        <div className="frame-59">
          <div className="frame-61">
            <button className="btn">Mulai</button>
            <button className="btn dark-btn"><img src={informationGuide} />Selengkapnya</button>
            <span className="frame-64">13+</span>
          </div>
          <div className="frame-65">
            <span className="volume-off"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

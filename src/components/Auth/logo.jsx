import logo from "../../assets/movieopen.svg"

export default function Logo() {
  return (
    <div className="logo">
      <div className="movie-open">
        <img className="vector-2" src={logo} />
      </div>
      <h1 className="chill">CHILL</h1>
    </div>
  );
}

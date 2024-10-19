import { useNavigate } from "react-router-dom";

export default function Button({ isLogin, onClick }) {
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    console.log("Google authentication not yet implemented");
  };

  const handleFormSubmit = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <div className="button">
      {/* Login or Register Button */}
      <button className="button-sign-in" onClick={handleFormSubmit}>
        <span className="daftar-2">{isLogin ? "Masuk" : "Daftar"}</span>
      </button>

      <div className="atau">Atau</div>

      {/* Google Authentication Button */}
      <button className="button-sign-in" onClick={handleGoogleAuth}>
        <div className="google"></div>
        <span className="daftar-dengan-google">{isLogin ? "Masuk dengan Google" : "Daftar dengan Google"}</span>
      </button>
    </div>
  );
}

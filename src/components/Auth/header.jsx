
// eslint-disable-next-line react/prop-types
export default function Header({isLogin}) {
  return (
    <div className="frame-63">
      <div className="daftar-1">{isLogin ? "Masuk" : "Daftar"}</div>
      <span className="selamat-datang">{isLogin ? "Selamat datang kembali!" : "Selamat datang!"}</span>
    </div>
  );
}







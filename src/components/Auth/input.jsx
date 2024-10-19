/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Input({
  placeholder,
  value,
  onChange,
  label,
  isPassword,
  isLogin,
  isSignUp
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="frame-52">
      <div className="frame-50">
        <span className="username">{label}</span>
      </div>
      <div className="frame-47">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : "email"}
          className="masukkan-username"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <div className="eye-off" onClick={togglePassword}>
            <img className="vector" src="eye-off.svg" />
          </div>
        )}
      </div>
      {isLogin && (
        <div className="frame-55">
          <div className="frame-54">
            <span className="belum-punya-akun-daftar">
              belum punya akun ?
              <a href="/Signup" className="daftar">
                Daftar
              </a>
            </span>
          </div>
          <a href="" className="lupa-kata-sandi">
            Lupa kata sandi?
          </a>
        </div>
      )}

      {isSignUp && (
        <div className="frame-55">
          <span className="belum-punya-akun-daftar">
            Sudah punya akun ?
            <a href="/login" className="daftar">
              Masuk
            </a>
          </span>
        </div>
      )}

    </div>
  );
}

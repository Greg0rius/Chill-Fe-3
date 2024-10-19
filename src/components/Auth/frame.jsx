import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Logo from "./logo";
import Input from "./input";
import Button from "./button";
import { login, signup } from "./../../firebase";

export default function Frame({ isLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!username || !password || (!isLogin && !confirmPassword)) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isValidEmail(username)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (isLogin) {
      try {
        const user = await login(username, password);
        setSuccessMessage(`Welcome back, ${user.email}!`);
        navigate("/");
      } catch (error) {
        setErrorMessage("Login failed: " + error.message);
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      try {
        const newUser = await signup(username, password);
        setSuccessMessage(`Account created for ${newUser.email}!`);
        navigate("/");
      } catch (error) {
        setErrorMessage("Signup failed: " + error.message);
      }
    }
  };

  return (
    <div className="frame56">
      <Logo />
      <Header isLogin={isLogin} />
      <Input
        placeholder="masukan username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
      />
      <Input
        placeholder="masukan password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        isPassword={true}
        isLogin={isLogin}
      />
      {!isLogin && (
        <Input
          placeholder="konfirmasi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Konfirmasi Password"
          isPassword={true}
          isSignUp = {true}
        />
      )}

      {/* Error Message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Success Message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <Button isLogin={isLogin} onClick={handleSubmit} />
    </div>
  );
}


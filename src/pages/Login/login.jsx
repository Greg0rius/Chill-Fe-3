import Container from "../../components/Auth/container";
import "./Login.css";

export default function Login() {
  return (
    <div className="container-login">
      <Container isLogin={true} />
    </div>
  );
}


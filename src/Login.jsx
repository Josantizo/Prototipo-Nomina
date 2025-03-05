import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [Usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (Usuario === "Usuario" && Contraseña === "1234") {
      navigate("/Dashboard"); // Redirección segura con React Router
    } else {
      alert("Usuario o Contraseña no válidos");

      setUsuario("");
      setContraseña("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" value={Usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='Usuario'></input>
      <input type='password' value={Contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder='Contraseña'></input>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
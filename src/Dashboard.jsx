import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const[Nombre,setNombre] = useState(""); //Estado que guarda el contenido del input
    const[NombreGuardado,setNombreGuardado] = useState(""); //Variable donde se almacena el contenido del input
    const[Apellido,setApellido] = useState("");
    const[ApellidoGuardado,setApellidoGuardado] = useState(""); 
    const[Jornada,setJornada] = useState("");
    const[JornadaGuardado,setJornadaGuardada] = useState("");

    const handleSaveEmployee = () => {
        setNombreGuardado(Nombre);
        setApellidoGuardado(Apellido);
        setJornadaGuardada(Jornada);
        alert("Empleado Ingresado correctamente");
        setNombre("");
        setApellido("");
        setJornada("");
    }

    const navigate = useNavigate();
    const cerrarSesion = () =>{
        navigate("/Login"); //Regresamos a la pagina de Login
    }
 
    return (
        <div>
            <h1>Bienvenido a la Nomina de la empresa!!!</h1>
            <h2>Ingreso de empleados</h2>
            <p>Nombre del Empleado</p>
            <input type="text" value={Nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre"></input>
            <p>Apellido del Empleado</p>
            <input type="text" value={Apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido"></input>
            <p>Jornada del Empleado</p>
            <input type="text" value={Jornada} onChange={(e) => setJornada(e.target.value)} placeholder="Jornada"></input>
            <button onClick={handleSaveEmployee}>Ingresar Empleado</button>
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
        </div>
    );
};

export default Dashboard;

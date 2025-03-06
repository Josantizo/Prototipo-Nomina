import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const[empleados, setEmpleados] = useState([]);
    const[areaseleccionada, setAreaseleccionada] = useState("");
    const[jornadaseleccionada, setJornadaSeleccionada] = useState("");
    const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);

    //Cargar empleados desde el JSON
    useEffect(() => {
        fetch("/empleados.json")
            .then(response => response.json())
            .then(data => setEmpleados(data));
    }, []);

    //Obtener opciones unicas del JSON
    const areasTrabajo = [...new Set(empleados.map(emp => emp.area_trabajo))];
    const jornadasLaborales = [...new Set(empleados.map(emp => emp.jornada_laboral))];

    //Filtrar empleados segun seleccion
    const empleadosFiltrados = empleados.filter( emp =>
        (areaseleccionada === "" || emp.area_trabajo === areaseleccionada) &&
        (jornadaseleccionada === "" || emp.jornada_laboral === jornadaseleccionada)
    );

    //Manejo de seleccion de Empleados
    const handleSeleccionEmpleado = (empleadoId) => {
        setEmpleadosSeleccionados((prev) =>
            prev.includes(empleadoId)
                ? prev.filter(id => id !== empleadoId) // Si ya esta seleccionado deseleccionarlo
                : [...prev, empleadoId] // Si no esta seleccionado, agregarlo
        );
    };

    const navigate = useNavigate();
    const cerrarSesion = () =>{
        navigate("/Login"); //Regresamos a la pagina de Login
    }
 
    return (
        <div>
            <h1>Bienvenido a la Nomina de la empresa!!!</h1>
            <label>Selecciona el grupo de empleados: </label>

            <label>Jornada Laboral</label>
            <select onChange={e => setJornadaSeleccionada(e.target.value)}>
                <option value="">Seleccionar Jornada</option>
                {jornadasLaborales.map(jornada => (
                    <option key={jornada} value={jornada}>{jornada}</option>
                ))}
            </select>

            <label>Area de Trabajo</label>
            <select onChange={e => setAreaseleccionada(e.target.value)}>
                <option value="">Seleccione Area de Trabajo</option>
                {areasTrabajo.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>

            <h3>Lista de Empleados</h3>    
            
            <table border="1">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Area de Trabajo</th>
                        <th>Jornada Laboral</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosFiltrados.map((emp, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={empleadosSeleccionados.includes(emp.nombre + emp.apellido)}
                                    onChange={() => handleSeleccionEmpleado(emp.nombre + emp.apellido)}
                                />
                            </td>
                            <td>{emp.nombre}</td>
                            <td>{emp.apellido}</td>
                            <td>{emp.area_trabajo}</td>
                            <td>{emp.jornada_laboral}</td>
                            <td>Q{emp.salario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h4>Empleados Seleccionados</h4>
                <ul>
                    {empleadosSeleccionados.map((empleado, index) => (
                        <li key={index}>{empleado}</li>
                    ))}
                </ul>
            </div>
            
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
        </div>
    );
};

export default Dashboard;

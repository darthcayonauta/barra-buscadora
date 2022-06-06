import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  //se usara para datos de forma dinamica
  const [usuarios, setUsuarios] = useState([]);

  //se usara para datos de forma estática
  const [tablaUsuarios, setTablaUsuarios] = useState([]);

  //busqueda
  const [busqueda, setBusqueda] = useState("");

  //api
  const url = "https://jsonplaceholder.typicode.com/users";

  const peticionGet = async () => {
    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data);
        setUsuarios(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => console.log(error));
  };

 //capturar la data del input
 const handleChange = e =>{
   console.log("Busqueda :"+ e.target.value);
   setBusqueda(e.target.value);
   filtrar(e.target.value);
 } 

 const filtrar = (terminoBusqueda)=>{
    var resultadosBusqueda = tablaUsuarios.filter( (elemento)=>{

      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
         || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      ){
        return elemento;
      }
    });

    setUsuarios(resultadosBusqueda);

 }


  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="App">

     <div className="containerInput">
          <input className="form-control inputBuscar" 
           type="text"
           value={busqueda}   
           placeholder="Busqueda por nombre o empresa"    
           onChange = {handleChange}      
          />
          <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
             Buscar
          </button>
    </div> 

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead>
            <tr>
              <td>ID</td>
              <td>Nombre</td>
              <td>Fono</td>
              <td>Username</td>
              <td>email</td>
              <td>Website</td>
              <td>Ciudad</td>
              <td>Empresa</td>
            </tr>
          </thead>
          <tbody>
            {usuarios &&
              usuarios.map((usuario) => {
                return (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.phone}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.website}</td>
                    <td>{usuario.address.city}</td>
                    <td>{usuario.company.name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

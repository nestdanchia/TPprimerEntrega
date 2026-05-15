import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductoDetalle() {
  const { id } = useParams();
  //const navigate = useNavigate();
  return (
    <div>
      <h2>Detalle del Producto</h2>
      <p>Mostrando información para el producto con ID: {id}</p>
      <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
        Volver al Catalogo
      </Link>
    </div>
  );
}

export default ProductoDetalle;
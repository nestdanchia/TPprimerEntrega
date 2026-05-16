import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export function RutaPrivadaElemental({ children }) {
  const tieneAcceso = false; 

  // El useEffect maneja el alert de forma segura sin romper el render
  useEffect(() => {
    if (!tieneAcceso) {
      alert("No tiene acceso");
    }
  }, [tieneAcceso]);

  // Si no tiene acceso, ejecuta la redirección inmediatamente
  if (!tieneAcceso) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
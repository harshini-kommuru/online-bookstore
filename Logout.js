import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setCart, setOrders }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (setCart) setCart([]);
    if (setOrders) setOrders([]);

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  }, [navigate, setCart, setOrders]);

  return null;
}
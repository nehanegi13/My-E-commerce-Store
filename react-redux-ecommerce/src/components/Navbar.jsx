import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function Navbar() {
  const productsCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleClick = () => navigate("/cart");

  return (
    <header>
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
          My E-commerce Store
        </Link>
      </h1>
      <Badge
        badgeContent={productsCart.length}
        color="primary"
        onClick={handleClick}
        sx={{ cursor: "pointer", margin: 2 }}
      >
        <ShoppingCartIcon color="action" />
      </Badge>
    </header>
  );
}

export default Navbar;

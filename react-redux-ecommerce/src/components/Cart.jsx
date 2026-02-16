import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { remove } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeCart = (id) => {
    dispatch(remove(id));
  };
  return (
    <>
      <Navbar />

      <button onClick={() => navigate(-1)}>Go back</button>
      {cartProducts.map((product) => (
        <Card
          variant="outlined"
          sx={{ display: "flex", m: 4, p: 2 }}
          key={product.id}
        >
          <Box sx={{ display: "flex", flexWrap: { xs: "wrap", md: "nowrap" } }}>
            <CardMedia
              sx={{
                height: 100,
                width: 200,
                flex: { xs: "0 0 auto", md: "1 0 auto" },
                backgroundSize: "contain",
              }}
              image={product.image}
              title={product.title}
            />
            <Box
              sx={{
                display: "flex",
                pl: 1,
                pb: 1,
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {product.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeCart(product.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Card>
      ))}
      {/* {JSON.stringify(cartProducts)} */}
    </>
  );
}

export default Cart;

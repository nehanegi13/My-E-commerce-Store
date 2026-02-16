import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { add } from "../store/CartSlice";

function ProductsItem({ item }) {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
  };

  return (
    <>
      <Card key={item.id}>
        <CardActionArea component={Link} to={`/product/${item.id}`}>
          <CardMedia
            component="img"
            image={item.image}
            title={item.title}
            height="250"
          />
          <CardContent>
            {item.title}
            <p className="product-price">
              Price: <span>${item.price}</span>
            </p>
            <div style={{ display: "flex" }}>
              Ratings:{" "}
              <Rating name="read-only" value={item.rating.rate} readOnly />
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => addToCart(item)}
          >
            Add to cart
          </Button>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/product/${item.id}`}
            style={{ margin: "0 0 0 15px", width: "50%" }}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductsItem;

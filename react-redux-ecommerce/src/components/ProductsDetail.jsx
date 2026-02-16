import React, { useEffect, useState } from "react";
import { getSingleProdcut } from "../services/api";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { add } from "../store/CartSlice";

function ProductDetail() {
  const [productDetail, setProductsDetail] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const getProductData = async () => {
    setLoading(true);
    id &&
      (await getSingleProdcut(id)
        .then((res) => {
          setProductsDetail(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        }));
  };

  useEffect(() => {
    getProductData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Link to={`/`} style={{ display: "flex", margin: "15px" }}>
                Back
              </Link>
              <img
                src={productDetail?.image}
                alt={productDetail?.title}
                className="product-img"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h2>{productDetail?.title}</h2>
              <h3>${productDetail?.price}</h3>
              <p>{productDetail?.description}</p>
              <div>
                <Button
                  variant="contained"
                  onClick={() => addToCart(productDetail)}
                >
                  Add to cart
                </Button>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ProductDetail;

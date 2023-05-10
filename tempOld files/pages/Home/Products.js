import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//project imports
import Product from "../../compponents/Product";
import products from "../../menuItems/products";

const Products = () => {
  return (
    <Box sx={{ my: "9.3rem", px: 1 }}>
      <Typography
        sx={{
          fontSize: "3.3rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        What We Have For You
      </Typography>
      <Box
        sx={{
          display: { xs: "blocK", lg: "flex" },
          alignItems: "end",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((product) => (
          <Product
            key={product.id}
            title={product.title}
            img={product.img}
            contents={product.contents}
            top={product.top}
            left={product.left}
            paddingTop={product.paddingTop}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;

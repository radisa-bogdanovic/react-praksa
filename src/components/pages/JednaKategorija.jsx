import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography } from "@mui/material";
import Kartica from "../Kartica";
import { useParams } from "react-router-dom";

export default function JednaKategorija() {
  const params = useParams();
  // const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params.kategorija) {
      pokupiDetalje(params.kategorija);
    }
  }, []);

  const pokupiDetalje = async (kategorija) => {
    try {
      const response = await axios.get(`1/search.php?s=${kategorija}`);
      const { data } = response;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component={"main"}
      sx={{
        maxWidth: "1536px",
        marginX: "auto",
        padding: 2,
      }}
    >
      <Typography
        component={"h1"}
        variant="h1"
        sx={{ textAlign: "center", marginY: 4 }}
      >
        {" "}
        Kategorije
      </Typography>
      {/* <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {category.map((data, id) => {
          return (
            <Kartica
              key={data.strCategory + id}
              description={data.strCategoryDescription}
              imgUrl={data.strCategoryThumb}
              title={data.strCategory}
            />
          );
        })}
      </Box> */}
    </Box>
  );
}

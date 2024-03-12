import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography } from "@mui/material";
import Kartica from "../Kartica";

export default function Kategorije() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    pokupiKorisnike();
  }, []);

  const pokupiKorisnike = async () => {
    try {
      const response = await axios.get("1/categories.php");
      const { data } = response;

      setCategory(data.categories);
      console.log(data.categories);
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
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
      </Box>
    </Box>
  );
}

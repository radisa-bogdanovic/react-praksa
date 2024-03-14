import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography } from "@mui/material";
import Kartica from "../Kartica";
import { useParams } from "react-router-dom";

export default function JednoJelo() {
  const params = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    console.log(params);
    if (params.id) {
      pokupiDetalje(params.id);
    }
  }, []);

  const pokupiDetalje = async (id) => {
    try {
      const response = await axios.get(`1/lookup.php?i=${id}`);
      const { data } = response;

      setMeal(data.meals[0]);
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
        {meal ? meal.strMeal : ""}
      </Typography>
      {/* <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {areas.map((data, id) => {
          return (
            <Kartica
              key={data.idMeal}
              description={data.strInstructions}
              imgUrl={data.strMealThumb}
              title={data.strMeal}
            />
          );
        })}
      </Box> */}
    </Box>
  );
}

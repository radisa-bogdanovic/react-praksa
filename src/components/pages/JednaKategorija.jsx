import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography } from "@mui/material";
import Kartica from "../Kartica";
import { useParams, useNavigate } from "react-router-dom";

export default function JednaKategorija() {
  const params = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (params.kategorija) {
      setTitle(params.kategorija);
      pokupiDetalje(params.kategorija);
    }
  }, []);

  const pokupiDetalje = async (kategorija) => {
    try {
      const response = await axios.get(`1/search.php?s=${kategorija}`);
      const { data } = response;

      setMeals(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component={"main"}
      sx={{
        maxWidth: "1200px",
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
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          rowGap: 5,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {meals.map((data, id) => {
          return (
            <Kartica
              key={data.idMeal + id}
              description={"No description"}
              imgUrl={data.strMealThumb}
              title={data.strMeal}
              onNavigate={() => {
                navigate("/meal/" + data.idMeal);
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

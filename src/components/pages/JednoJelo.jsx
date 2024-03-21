import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import Kartica from "../Kartica";
import { useParams } from "react-router-dom";

export default function JednoJelo() {
  const params = useParams();
  const [meal, setMeal] = useState(null);
  const [zacini, setZacini] = useState({});

  useEffect(() => {
    if (params.id) {
      pokupiDetalje(params.id);
    }
  }, []);

  const pokupiDetalje = async (id) => {
    try {
      let ingredients = [];
      let amount = [];
      const response = await axios.get(`1/lookup.php?i=${id}`);
      const { data } = response;

      for (let i = 1; i < 20; i++) {
        const zacin = data.meals[0][`strIngredient${i}`];
        const kolicina = data.meals[0][`strMeasure${i}`];
        if (zacin.length > 0) {
          ingredients.push(zacin);
          amount.push(kolicina);
        }
      }
      setZacini({ ingredients: ingredients, amount: amount });
      setMeal(data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        component={"main"}
        sx={{
          maxWidth: "1200px",
          marginX: "auto",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
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
        {meal ? (
          <Kartica
            key={meal.idMeal}
            description={meal.strInstructions}
            imgUrl={meal.strMealThumb}
            title={meal.strMeal}
            isCustomCard={true}
            zacini={zacini}
            onNavigate={() => {
              navigate("/meal/" + meal.idMeal);
            }}
          />
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={150} sx={{ marginTop: 5 }} />
          </Box>
        )}
      </Box>
    </>
  );
}

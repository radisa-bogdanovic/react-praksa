import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography, CircularProgress, TextField } from "@mui/material";
import Kartica from "../Kartica";
import { useParams, useNavigate } from "react-router-dom";

export default function JednaKategorija() {
  const params = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  // const [searchedMeals, setSearchedMeals] = useState([]);
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEmptySearch, setIsEmptySearch] = useState(false);

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
      // setSearchedMeals(data.meals);
    } catch (error) {
      console.log(error);
    }
  };
  const onValueChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const searchedMeals = meals.filter((meal) => {
      return meal.strMeal.toLowerCase().includes(value.toLowerCase());
      // ||
      // meal.strDescription.toLowerCase().includes(value.toLowerCase())
    });
    if (searchedMeals.length > 0) {
      setIsEmptySearch(false);
    } else {
      setIsEmptySearch(true);
    }
  };
  return (
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
        {title}
      </Typography>

      <TextField
        id="search-field"
        label="Pretrazi"
        variant="outlined"
        value={inputValue}
        onChange={onValueChange}
        sx={{ marginY: 4 }}
      />
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
        {meals.length > 0 ? (
          meals
            .filter((meal) => {
              return meal.strMeal
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            })
            .map((data, id) => {
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
            })
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={150} sx={{ marginTop: 5 }} />
          </Box>
        )}
        {isEmptySearch && (
          <>
            No data for <strong>{inputValue}</strong>
          </>
        )}
      </Box>
    </Box>
  );
}

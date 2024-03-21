import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import Kartica from "../Kartica";
import { useParams, useNavigate } from "react-router-dom";

export default function JednaOblast() {
  const params = useParams();
  const navigate = useNavigate();

  const [areas, setAreas] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(params);
    if (params.oblast) {
      setTitle(params.oblast);
      pokupiDetalje(params.oblast);
    }
  }, []);

  const pokupiDetalje = async (oblast) => {
    try {
      const response = await axios.get(`1/filter.php?a=${oblast}`);
      const { data } = response;

      setAreas(data.meals);
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
        {areas.length > 0 ? (
          areas.map((data, id) => {
            return (
              <Kartica
                key={data.idMeal}
                description={data.strInstructions}
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
      </Box>
    </Box>
  );
}

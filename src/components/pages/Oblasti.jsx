import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography } from "@mui/material";
import Kartica from "../Kartica";

export default function Oblasti() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    pokupiKorisnike();
  }, []);

  const pokupiKorisnike = async () => {
    try {
      const response = await axios.get("1/list.php?a=list");
      const { data } = response;
      console.log(data.meals);
      setAreas(data.meals);
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
        Oblasti
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {areas.map((data, id) => {
          return (
            <Kartica
              key={data.strArea + id}
              description={"No description"}
              imgUrl={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMcvumPgt3duUj93twRyg2soEMPdU72K-0Lg&usqp=CAU"
              }
              title={data.strArea}
            />
          );
        })}
      </Box>
    </Box>
  );
}

import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import Kartica from "../Kartica";
import { useNavigate } from "react-router-dom";

export default function Oblasti() {
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

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
      console.error(error);
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
        Oblasti
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          rowGap: 5,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {areas.length > 0 ? (
          areas.map((data, id) => {
            return (
              <>
                <Kartica
                  key={data.strArea + id}
                  description={"No description"}
                  imgUrl={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMcvumPgt3duUj93twRyg2soEMPdU72K-0Lg&usqp=CAU"
                  }
                  title={data.strArea}
                  onNavigate={() => {
                    navigate(`/oblasti/${data.strArea}`);
                  }}
                />
                {/* <img
                src={"hehe"}
                onError={(e) => {
                  e.currentTarget.src = "/ddsadasd/dsadas";
                  e.currentTarget.onerror = null;
                }}
              /> */}
              </>
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

import { Box, Typography } from "@mui/material";

export default function Pocetna() {
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
        Pocetna stranica
      </Typography>
    </Box>
  );
}

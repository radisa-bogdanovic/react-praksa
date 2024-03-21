import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MediaCard({
  title,
  imgUrl,
  description,
  onNavigate,
  isCustomCard,
  zacini,
}) {
  return (
    <Card sx={{ maxWidth: isCustomCard ? "800px" : "350px", width: "100%" }}>
      <CardMedia
        sx={{ height: isCustomCard ? 400 : 140 }}
        image={imgUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {isCustomCard && (
        <Box>
          <ul>
            {zacini.ingredients.map((ingredients, id) => {
              return (
                <li key={ingredients + id}>
                  {ingredients} - {zacini.amount[id]}
                </li>
              );
            })}
          </ul>
        </Box>
      )}
      {!isCustomCard && (
        <CardActions>
          <Button size="small" onClick={onNavigate}>
            Vidi detalje
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

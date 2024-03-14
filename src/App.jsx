import { useState, useEffect } from "react";
import { Komponenta } from "./components/Komponenta";
import axios from "./components/utilities/axios";
import Button from "@mui/material/Button";
import "./App.css";
import { Tema } from "./components/utilities/theme";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Navigacija from "./components/layouts/Header";
import { Routes, Route } from "react-router-dom";
import Pocetna from "./components/pages/Pocetna";
import Kategorije from "./components/pages/Kategorije";
import Oblasti from "./components/pages/Oblasti";
import JednaKategorija from "./components/pages/JednaKategorija";
import JednaOblast from "./components/pages/JednaOblast";
import JednoJelo from "./components/pages/JednoJelo";

function App() {
  return (
    <ThemeProvider theme={Tema}>
      <Navigacija />
      <>
        <Routes>
          <Route path="" element={<Pocetna />} />

          <Route path="/oblasti/" element={<Oblasti />} />
          <Route path="/oblasti/:oblast" element={<JednaOblast />} />

          <Route path="/kategorije/" element={<Kategorije />} />
          <Route path="/kategorije/:kategorija" element={<JednaKategorija />} />

          <Route path="/meal/:id" element={<JednoJelo />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;

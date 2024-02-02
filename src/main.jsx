import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header/Header";
import DomainSearch from "./components/DomainSearch/DomainSearch";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/domains" element={<DomainSearch />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

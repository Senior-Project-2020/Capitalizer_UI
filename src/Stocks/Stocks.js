import React from "react";
import { SideBar } from "../components/SideBar";
import { SearchBar } from "../components/SearchBar";

export function StockPage() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <div style={{ flexGrow: "1" }}>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

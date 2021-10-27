import React from "react";
import Routes from "../mobile/navigation/Routes";
import { registerRootComponent } from "expo";

export default function App() {
  return <Routes />;
}

registerRootComponent(App);

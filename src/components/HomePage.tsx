import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store/store";
import { AppScaffold } from "./Scaffold/Scaffold";

export function HomePage() {
  const { auth } = useSelector((state: RootState) => state);

  return (
    <AppScaffold>
      <div className="w-full h-64 bg-gray-600"></div>
    </AppScaffold>
  );
}

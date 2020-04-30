import React from "react";
import { useUrls } from "../common/hooks/useUrls";
import { UUID } from "src/types";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { Arrival } from "../Arrival/Arrival";

interface Props {
  id?: UUID;
  filterField: string;
}

/** Renders button in location table to access arrivals from given location */
export function ArrivalFilterButton({ id, filterField }: Props) {
  const urls = useUrls();
  if (!id) return <div></div>;

  return (
    <Link to={urls.list({ resourceName: Arrival.NAME }) + `?${filterField}=${id}`}>
      <Button color="primary" startIcon={<SwapVert />}>
        Arrivals
      </Button>
    </Link>
  );
}

import { IconButton } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppIcons } from "../Icons";
import { usePrefetch } from "../usePrefetch";
import { dataProvider } from "components/dataProvider";

type ShowData<T> = [
  T,
  {
    editButton: JSX.Element;
    backButton: JSX.Element;
    deleteButton: JSX.Element;
  }
];

export function useShow<T>(
  name: string,
  transform: (val: any) => T
): ShowData<T> {
  const location = usePrefetch<any>(name, transform);
  const history = useHistory();
  const basePath = useLocation().pathname.replace("/show", "");
  const editPath = `${basePath}/edit`;

  const editButton = (
    <IconButton onClick={() => history.push(editPath)}>
      <AppIcons.Edit />
    </IconButton>
  );

  const deleteButton = (
    <IconButton onClick={() => dataProvider.delete(basePath)}>
      <AppIcons.Delete />
    </IconButton>
  );

  const backButton = (
    <IconButton onClick={() => history.goBack()}>
      <AppIcons.ArrowBack />
    </IconButton>
  );

  return [location, { editButton, backButton, deleteButton }];
}

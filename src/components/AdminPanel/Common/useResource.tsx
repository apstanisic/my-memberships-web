import { IconButton } from "@material-ui/core";
import { dataProvider } from "components/dataProvider";
import { Column, MaterialTableProps } from "material-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addToResource } from "store/adminSlice";
import { RootState } from "store/store";
import { WithId } from "types";
import * as tableConfig from "../materialTableConfig";
import { AppIcons } from "./../Icons";

interface ConfigOptions<T extends object>
  extends Omit<Partial<MaterialTableProps<T>>, "data"> {
  data: T[];
}

type Return<T extends object> = [
  T[],
  {
    isLoading: boolean;
    view: (row: WithId) => void;
    edit: (row: WithId) => void;
    create: (row: WithId) => void;
    onDelete: (rows: WithId | WithId[]) => Promise<any>;
    config: ConfigOptions<T>;
    viewAndEdit: [Column<T>, Column<T>];
  }
];

export function useResource<T extends WithId = any>(
  resource: string
): Return<T> {
  // Urls
  const adminUrl = useSelector((state: RootState) => state.admin.adminUrl);
  const { pathname, search } = useLocation();
  const remoteUrl = pathname.replace(adminUrl, "");

  const [resources, setResource] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const view = (row: WithId) => history.push(`${pathname}/${row.id}/show`);
  const edit = (row: WithId) => history.push(`${pathname}/${row.id}/edit`);
  const create = (row: WithId) => history.push(`${pathname}/create`);

  useEffect(() => {
    dataProvider
      .getList<T>(remoteUrl, search)
      .then(res => {
        dispatch(addToResource({ resource, data: res.data }));
        setResource(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [remoteUrl, dispatch, search, resource]);

  async function onDelete(rows: WithId | WithId[]) {
    interface ResourceData {
      item: T;
      position: number;
    }
    console.log("delete");

    const items = Array.isArray(rows) ? rows : [rows];
    let resourcesToDelete: ResourceData[] = [];
    const deletedPositions: number[] = [];
    setResource(
      resources.filter((resource, i) => {
        if (items.every(item => item.id !== resource.id)) return true;
        resourcesToDelete.push({ item: resource, position: i });
        return false;
      })
    );
    if (!resourcesToDelete.length) return;
    try {
      const promises = resourcesToDelete.map((row, i) =>
        dataProvider
          .delete(remoteUrl, { id: row.item.id })
          .then(() => resourcesToDelete.splice(i, 1))
          .then(() => deletedPositions.push(row.position))
          .catch(e => {
            throw row;
          })
      );
      await Promise.all(promises);
    } catch (error) {
      // resourcesToDelete.forEach(resource => {
      //   resources.splice(resource.position, 0, resource.item);
      // });
      deletedPositions.forEach(i => {
        resources.splice(i, 1);
      });
      setResource(resources);
      alert("errror");
    } finally {
      setIsLoading(false);
    }
  }

  const viewAndEdit: [Column<T>, Column<T>] = [
    {
      title: "View",
      cellStyle: { maxWidth: 60 },
      headerStyle: { maxWidth: 60 },
      render: (row: WithId) => (
        <IconButton onClick={() => view(row)}>
          <AppIcons.Visibility />
        </IconButton>
      )
    },
    {
      title: "Edit",
      cellStyle: { maxWidth: 60 },
      headerStyle: { maxWidth: 60 },
      render: (row: WithId) => (
        <IconButton onClick={() => edit(row)}>
          <AppIcons.Edit />
        </IconButton>
      )
    }
  ];

  const config: ConfigOptions<T> = {
    ...tableConfig,
    isLoading,
    editable: {
      isDeletable: () => true,
      onRowDelete: onDelete
    },
    actions: [
      {
        tooltip: "Remove All Selected locations",
        icon: AppIcons.Delete as any,
        onClick: (evt, data) => onDelete(data)
      },
      {
        icon: AppIcons.Add as any,
        onClick: create,
        isFreeAction: true
      }
    ],
    data: resources
  };

  return [
    resources,
    {
      isLoading,
      view,
      edit,
      create,
      config,
      onDelete,
      viewAndEdit
    }
  ];
}

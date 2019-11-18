import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { WithId, PaginationResult } from "types";
import { Http } from "core/http";
import { MaterialTableProps, Column } from "material-table";
import * as tableConfig from "./materialTableConfig";
import { IconButton } from "@material-ui/core";
import { wait } from "core/utils/helpers";
import { useDispatch } from "react-redux";
import { addToResource } from "store/adminSlice";
import { toggleSidebar } from "store/uiSlice";
import { Location } from "./Location/Location";

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

export function useResource<T extends WithId = any>(label: string): Return<T> {
  const [resources, setResource] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = useLocation().pathname;
  const history = useHistory();
  const basePath = path.replace("/admin-panel", "");
  const dispatch = useDispatch();

  const view = (row: WithId) => history.push(`${path}/${row.id}/show`);
  const edit = (row: WithId) => history.push(`${path}/${row.id}/edit`);
  const create = (row: WithId) => history.push(`${path}/${row.id}/create`);

  useEffect(() => {
    Http.get<PaginationResult<T>>(basePath)
      .then(res => {
        dispatch(
          addToResource({
            resource: label.toLowerCase(),
            data: (res.data.data as any) as Location[]
          })
          // toggleSidebar()
        );
        setResource(res.data.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [basePath, dispatch, label]);

  async function onDelete(rows: WithId | WithId[]) {
    interface ResourceData {
      item: T;
      position: number;
    }
    // let undo = false;
    const items = Array.isArray(rows) ? rows : [rows];
    let resourcesToDelete: ResourceData[] = [];
    setResource(
      resources.filter((resource, i) => {
        if (items.every(item => item.id !== resource.id)) return true;
        resourcesToDelete.push({ item: resource, position: i });
        return false;
      })
    );
    if (!resourcesToDelete.length) return;
    try {
      // await wait(5000);
      // if (undo) {
      //   return;
      // }
      const promises = resourcesToDelete.map((row, i) =>
        Http.delete<WithId>(`${basePath}/${row.item.id}`)
          .then(() => resourcesToDelete.splice(i, 1))
          .catch(e => {
            throw row;
          })
      );
      await Promise.all(promises);
    } catch (error) {
      resourcesToDelete.forEach(resource => {
        resources.splice(resource.position, 0, resource.item);
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
          <tableConfig.icons.Visibility />
        </IconButton>
      )
    },
    {
      title: "Edit",
      cellStyle: { maxWidth: 60 },
      headerStyle: { maxWidth: 60 },
      render: (row: WithId) => (
        <IconButton onClick={() => edit(row)}>
          <tableConfig.icons.Edit />
        </IconButton>
      )
    }
  ];

  const config: ConfigOptions<T> = {
    ...tableConfig,
    isLoading,
    title: label,
    editable: {
      isDeletable: () => true,
      onRowDelete: onDelete
    },
    actions: [
      {
        tooltip: "Remove All Selected locations",
        icon: tableConfig.icons.Delete as any,
        onClick: (evt, data) => onDelete(data)
      },
      {
        icon: tableConfig.icons.Add as any,
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

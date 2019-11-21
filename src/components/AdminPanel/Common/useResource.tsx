import { IconButton, Toolbar } from "@material-ui/core";
import { dataProvider } from "components/dataProvider";
import { Column, MaterialTableProps, MTableToolbar } from "material-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addToResource } from "store/adminSlice";
import { RootState } from "store/store";
import { PaginationMetadata, WithId } from "types";
import * as tableConfig from "../materialTableConfig";
import { AppIcons } from "./../Icons";
import { TableToolbar } from "./TableToolbar";
import { Pagination } from "./Pagination";
import { useDelete } from "./useDelete";
import { useUrls } from "./useUrls";

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
    CustomActions: [Column<T>];
    alertDialog: JSX.Element;
  },
];

const returnFunc = (val: any) => val;

export function useResource<T extends WithId = any>(
  transform: (val: any) => T = returnFunc,
): Return<T> {
  const authInited = useSelector((state: RootState) => state.auth.isInited);
  const deleting = useDelete(onDelete);
  // Urls
  const urls = useUrls();
  const remoteUrl = urls.remoteBase();
  const { search } = useLocation();

  const [resources, setResource] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMetadata>();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const view = (row: WithId) => history.push(urls.show(row.id));
  const edit = (row: WithId) => history.push(urls.edit(row.id));
  const create = (row: WithId) => history.push(urls.create());

  useEffect(() => {
    if (!authInited) return;
    setIsLoading(true);
    dataProvider
      .getMany<T>(remoteUrl, search)
      .then(res => {
        const data = res.data.map(item => transform(item));
        dispatch(addToResource({ data: res.data }));
        setResource(data);
        setMeta(res.pagination);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [remoteUrl, dispatch, search, transform, authInited]);

  async function onDelete(rows?: WithId | WithId[]) {
    interface ResourceData {
      item: T;
      position: number;
    }
    if (!rows) return;

    const items = Array.isArray(rows) ? rows : [rows];
    let resourcesToDelete: ResourceData[] = [];
    const deletedPositions: number[] = [];
    setResource(
      resources.filter((resource, i) => {
        if (items.every(item => item.id !== resource.id)) return true;
        resourcesToDelete.push({ item: resource, position: i });
        return false;
      }),
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
          }),
      );
      await Promise.all(promises);
    } catch (error) {
      deletedPositions.forEach(i => {
        resources.splice(i, 1);
      });
      setResource(resources);
      alert("errror");
    } finally {
      setIsLoading(false);
    }
  }

  // const viewAndEdit: [Column<T>, Column<T>, Column<T>] = [
  const viewAndEdit: [Column<T>] = [
    {
      title: "View",
      cellStyle: { maxWidth: 100 },
      headerStyle: { maxWidth: 100, textAlign: "center" },
      render: (row: WithId) => (
        <div className="flex">
          <IconButton onClick={() => view(row)}>
            <AppIcons.Visibility />
          </IconButton>
          <IconButton onClick={() => edit(row)}>
            <AppIcons.Edit />
          </IconButton>
          <div onClick={() => deleting.setData(row)}>{deleting.button}</div>
        </div>
      ),
    },
  ];

  const config: ConfigOptions<T> = {
    ...tableConfig,
    isLoading,
    editable: {
      // isDeletable: () => true
      // onRowDelete: onDelete
    },
    actions: [
      {
        tooltip: "Remove All Selected locations",
        icon: AppIcons.Delete as any,
        onClick: (evt, data) => {
          deleting.setData(data);
          deleting.setOpen(true);
        },
      },
      {
        icon: AppIcons.Add as any,
        onClick: create,
        isFreeAction: true,
      },
    ],

    components: {
      Pagination: () => (!meta ? <td></td> : <Pagination meta={meta} />),
      Toolbar: props => <TableToolbar {...props} />,
    },
    data: resources,
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
      CustomActions: viewAndEdit,
      alertDialog: deleting.alert,
    },
  ];
}

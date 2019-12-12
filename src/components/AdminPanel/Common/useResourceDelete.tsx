import React from "react";
import { WithId } from "src/types";
import { dataProvider } from "src/components/dataProvider";
import { useUrls } from "./useUrls";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

interface ResourceDeleteData<T> {
  item: T;
  position: number;
}

export function useResourceDelete<T extends WithId>({
  resources,
  setResource,
}: {
  resources: T[];
  setResource: (val: any) => any;
}) {
  const urls = useUrls();
  const remoteUrl = urls.remoteBase();
  const snackbar = useSnackbar();

  return async function onDelete(rows?: WithId | WithId[]) {
    if (!rows) return;
    if (!Array.isArray(rows)) return deleteOne(rows);
    return deleteMany(rows);
  };

  async function deleteOne(row: WithId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
    });
    if (!result.value) return;
    try {
      await dataProvider.delete(remoteUrl, { id: row.id });
      setResource(resources.filter(resource => resource.id !== row.id));
      snackbar.enqueueSnackbar("Deleted successfully.", {
        variant: "success",
      });
    } catch (error) {
      snackbar.enqueueSnackbar("Error deleting.", {
        variant: "error",
      });
    }
  }

  async function deleteMany(rows: WithId[]) {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
    });
    if (!result.value) return;
    let resourcesToDelete: ResourceDeleteData<T>[] = [];
    const deletedPositions: number[] = [];
    // For every row in table check if it exist in id for deletion.
    // If it exist, add to resourceToDelete and save it's position
    setResource(
      resources.filter((resource, i) => {
        if (rows.every(row => row.id !== resource.id)) return true;
        resourcesToDelete.push({ item: resource, position: i });
        return false;
      }),
    );
    // Abort if there aren't any resources
    if (!resourcesToDelete.length) return;
    // For every resource try to delete
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
      snackbar.enqueueSnackbar("Deleted successfully.", {
        variant: "success",
      });
    } catch (error) {
      deletedPositions.forEach(i => {
        resources.splice(i, 1);
      });
      setResource(resources);
      snackbar.enqueueSnackbar("Error deleting.", {
        variant: "error",
      });
    }
  }
}

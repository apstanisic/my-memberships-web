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

/**
 * Params for useResourceDelete
 * Params are return values from useState, but state is kept in parent function
 * because state is shared across couple of functions
 */
interface Params<Resource extends WithId> {
  /** All resources currently visible in table. */
  resources: Resource[];
  /** Function to change visible resources. */
  setResources: (resources: Resource[]) => any;
}

/**
 * Provide this hook with current resources in table and method to hide them from
 * table and this hook will return function that will delete those resources with
 * confirmation. It uses dataProvider to handle deletion.
 */
export function useResourceDelete<Resource extends WithId>({
  resources,
  setResources,
}: Params<Resource>): (rows?: Resource | Resource[]) => Promise<void | Resource> {
  const urls = useUrls();
  const remoteUrl = urls.remoteBase();
  const snackbar = useSnackbar();

  /** Function that hide deleted resources from display */
  function hideResourcesFromTable(res: Resource | Resource[]) {
    const toDelete = Array.isArray(res) ? res : [res];
    setResources(
      resources.filter((resource, i) => {
        // If any row in toDelete array contains same id as in resource, remove that resource
        // Simplified: Remove all rows that have id in toDelete array
        if (toDelete.some(toDeleteRow => toDeleteRow.id === resource.id)) return false;
        return true;
      }),
    );
  }

  /** Wrapper around deleteOne and deleteMany. Can accept either row or array of rows */
  return async function onDelete(rows?: Resource | Resource[]): Promise<void | Resource> {
    if (!rows) return;
    if (!Array.isArray(rows)) return deleteOne(rows);
    return deleteMany(rows);
  };

  /** Delete one row with confirmation prompt.
   * @returns deleted row or undefined in user did not confirm, or an error.
   */
  async function deleteOne(row: Resource): Promise<Resource | undefined> {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
    });
    if (!result.value) return;

    try {
      await dataProvider.delete(remoteUrl, { id: row.id });
      hideResourcesFromTable(row);
      snackbar.enqueueSnackbar("Deleted successfully.", { variant: "success" });
      return row;
    } catch (error) {
      snackbar.enqueueSnackbar("Problem deleting. Please try later.", { variant: "error" });
    }
  }

  /** Delete many rows */
  async function deleteMany(rows: Resource[]): Promise<void> {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
    });
    if (!result.value) return;

    let resourcesToDelete: ResourceDeleteData<Resource>[] = [];
    const deletedPositions: number[] = [];
    // For every row in table check if it exist in id for deletion.
    // If it exist, add to resourceToDelete and save it's position
    setResources(
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
      setResources(resources);
      snackbar.enqueueSnackbar("Error deleting.", {
        variant: "error",
      });
    }
  }
}

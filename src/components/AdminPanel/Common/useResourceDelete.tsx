import { WithId } from "types";
import { dataProvider } from "components/dataProvider";
import { useUrls } from "./useUrls";

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
  async function onDelete(rows?: WithId | WithId[]) {
    const remoteUrl = urls.remoteBase();
    if (!rows) return;

    const items = Array.isArray(rows) ? rows : [rows];
    let resourcesToDelete: ResourceDeleteData<T>[] = [];
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
      // setIsLoading(false);
    }
  }
  return onDelete;
}

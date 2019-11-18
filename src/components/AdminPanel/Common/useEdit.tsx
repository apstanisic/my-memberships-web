import { dataProvider } from "components/dataProvider";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store/store";
import { WithId } from "types";
import { usePrefetch } from "../usePrefetch";

type ReturnData<T> = [T | undefined, () => any, () => any];

export function useEdit<T extends WithId>(
  resourceName: string,
  transform: (val: any) => T
): ReturnData<T> {
  const resource = usePrefetch<T>(resourceName, transform);
  const companyId = useSelector((state: RootState) => state.admin.companyId);
  const baseUrl = `/companies/${companyId}/${resourceName}`;
  const history = useHistory();

  const onSubmit = () => {
    if (!resource) return;
    dataProvider.update(baseUrl, { data: resource });
    history.push(`/admin-panel${baseUrl}/${resource.id}/show`);
  };

  const goBack = () => {
    if (window.confirm("Are you sure?")) history.goBack();
  };

  return [resource, onSubmit, goBack];
}

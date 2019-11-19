import { dataProvider } from "components/dataProvider";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "store/store";
import { WithId } from "types";
import { useProvider } from "../usePrefetch";
import { useUrls } from "./useUrls";
import { setUrlData } from "store/adminSlice";

type ReturnData<T> = [T | undefined, () => any, () => any];

export function useEdit<T extends WithId>(
  transform: (val: any) => T = (val: any) => val,
): ReturnData<T> {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resourceId } = useParams();
  dispatch(setUrlData({ resourceId }));
  const url = useUrls();

  const resource = useProvider<T>(url.resourceName(), transform);

  const onSubmit = () => {
    if (!resource) return;
    dataProvider.update(url.remoteBase(), { data: resource });
    history.push(url.show());
  };

  const goBack = () => {
    if (window.confirm("Are you sure?")) history.goBack();
  };

  return [resource, onSubmit, goBack];
}

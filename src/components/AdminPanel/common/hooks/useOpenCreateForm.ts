import { useHistory } from "react-router-dom";
import { useUrls } from "./useUrls";

/**
 * Simple helper hook that generates
 * create method for given resource
 */
export function useOpenCreateForm() {
  const history = useHistory();
  const urls = useUrls();
  return () => history.push(urls.create());
}

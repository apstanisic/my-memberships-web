import qs from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { removeEmptyItems, Struct } from "core/utils/helpers";
import { convertSearch } from "components/dataProvider";

interface Props {
  name: string;
  val: any;
}
export function useChangeSearch() {
  const { pathname, search } = useLocation();
  const history = useHistory();

  return (props: Struct) => {
    const newSearchData = { ...props, pg_cursor: null };
    const newSearch = convertSearch(search, newSearchData);
    history.push(`${pathname}${newSearch}`);
  };
}

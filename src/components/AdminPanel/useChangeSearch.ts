import { convertSearch } from "components/dataProvider";
import { Struct } from "core/utils/helpers";
import { useHistory, useLocation } from "react-router-dom";

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

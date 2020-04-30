import { useHistory, useLocation } from "react-router-dom";
import { convertSearch } from "src/core/utils/convertSearch";
import { Struct } from "src/core/utils/helpers";

/**
 * Change url search params
 */
export function useChangeUrlSearch() {
  const { pathname, search } = useLocation();
  const history = useHistory();

  return (props: Struct) => {
    const newSearchData = { ...props, pg_cursor: null };
    const newSearch = convertSearch(search, newSearchData);
    history.push(`${pathname}${newSearch}`);
  };
}

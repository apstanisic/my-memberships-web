import { useRouteMatch } from "react-router-dom";

/**
 * Checks whether route is inside company in admin panel
 */
export function useIsInAdminPanel() {
  const match = useRouteMatch({
    path: "/admin-panel/companies/:companyId",
    exact: false,
  });
  return match !== null;
}

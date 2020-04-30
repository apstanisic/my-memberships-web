import { User } from "src/core/auth/User";
import { Arrival } from "../Arrival/Arrival";
import { Location } from "../Location/Location";
import { Subscription } from "../Subscription/Subscription";

interface Info {
  resourceName?: string;
  column?: string;
  title?: string;
}

export function idMapper(columnName: string): Info {
  if (columnName.startsWith("location")) {
    return {
      resourceName: Location.NAME,
      column: "name",
      title: "Location",
    };
  }
  if (columnName.startsWith("user")) {
    return { resourceName: User.NAME, column: "name", title: "User" };
  }
  if (columnName.startsWith("arrival")) {
    return { resourceName: Arrival.NAME, column: "id", title: "Arrival" };
  }
  if (columnName.startsWith("subscription")) {
    return {
      resourceName: Subscription.NAME,
      column: "id",
      title: "Subscription",
    };
  }
  return {};
}

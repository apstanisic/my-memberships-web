import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { Padding } from "components/common/Padding";
import { Spacer } from "components/common/Spacer";
import React from "react";
import { Link } from "react-router-dom";
import { EmailField } from "../Common/EmailField";
import { ShowItem } from "../Common/ShowItem";
import { useShow } from "../Common/useShow";
import { useUrls } from "../Common/useUrls";
import { Location } from "./Location";

export function LocationShow() {
  const [location, Header] = useShow(Location.NAME, Location.create);
  const url = useUrls().root();

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header title={`Location ${location?.name ?? "No name"}`} />
        <List>
          <ShowItem val={location?.address} name="Address" />
          <ShowItem val={location?.phoneNumber} name="Phone number" />
          <ShowItem val={<EmailField email={location?.email} />} name="Email" />
          <ShowItem val={location?.lat} name="Latitude" />
          <ShowItem val={location?.long} name="Longitude" />
          <ShowItem
            name="Arrivals"
            val={
              <Link to={`${url}/arrivals?locationId=${location?.id}`}>
                <Button startIcon={<SwapVert />}>Arrivals</Button>
              </Link>
            }
          />
          <Spacer height={20} />
          <ListItem>
            <ListItemText
              primary={<span className="text-xl">Workhours</span>}
            />
          </ListItem>
          <Padding side="l" size={2}>
            <ShowItem val={location?.workingHours.monday} name="Monday" />
            <ShowItem val={location?.workingHours.tuesday} name="Tuesday" />
            <ShowItem val={location?.workingHours.wednesday} name="Wednesday" />
            <ShowItem val={location?.workingHours.thursday} name="Thursday" />
            <ShowItem val={location?.workingHours.friday} name="Friday" />
            <ShowItem val={location?.workingHours.saturday} name="Saturday" />
            <ShowItem val={location?.workingHours.sunday} name="Sunday" />
          </Padding>
        </List>
      </CardContent>
    </Card>
  );
}

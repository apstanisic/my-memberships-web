import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { Spacer } from "components/common/Spacer";
import React from "react";
import { EmailField } from "../Common/EmailField";
import { ShowItem } from "../Common/ShowItem";
import { useShow } from "../Common/useShow";
import { Location } from "./Location";
import { AppIcons } from "../Icons";

export function LocationShow() {
  const [location, buttons] = useShow(Location.NAME, Location.create);

  return (
    <Card className="max-w-3xl mx-auto">
      {(location?.images.length ?? 0) > 0 ? (
        <CardMedia
          component="img"
          height={150}
          image={location?.images[0].md}
          title="Contemplative Reptile"
        />
      ) : (
        ""
      )}
      <CardContent>
        <div className="flex justify-between items-center pb-4">
          {buttons.backButton}
          <Typography variant="h5" component="h2">
            Location {location?.name || "No name"}
          </Typography>
          <div>
            {buttons.editButton}
            {buttons.deleteButton}
          </div>
        </div>
        <List>
          <ShowItem val={location?.address} name="Address" />
          <ShowItem val={location?.phoneNumber} name="Phone number" />
          <ShowItem val={<EmailField email={location?.email} />} name="Email" />
          <ShowItem val={location?.lat} name="Latitude" />
          <ShowItem val={location?.long} name="Longitude" />
          <Spacer height={20} />
          <ListItem>
            <ListItemText
              primary={
                <Typography component="span" variant="h6">
                  Workhours
                </Typography>
              }
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

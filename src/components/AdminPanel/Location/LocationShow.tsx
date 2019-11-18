import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  CardActionArea,
  CardActions,
  Button,
  ListSubheader,
  IconButton
} from "@material-ui/core";
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { usePrefetch } from "../usePrefetch";
import { Location } from "./Location";
import { EmailField } from "../EmailField";
import { Padding } from "components/common/Padding";
import { Spacer } from "components/common/Spacer";
import { tableIcons } from "../Icons";

const transform = (val: any) => new Location(val);

function Item({ name, val }: { name: string; val: any }) {
  return (
    <ListItem className="flex justify-between">
      <ListItemText primary={name} />
      <ListItemText primary={val} className="text-right" />
    </ListItem>
  );
}

export function LocationShow() {
  const location = usePrefetch<Location>("locations", transform);
  const history = useHistory();
  const path = useLocation().pathname;

  if (!location) return <div></div>;

  return (
    <Card>
      {location.images.length > 0 ? (
        <CardMedia
          component="img"
          height={150}
          image={location.images[0].md}
          title="Contemplative Reptile"
        />
      ) : (
        ""
      )}
      <CardContent>
        <div className="flex justify-between items-center">
          <Typography gutterBottom variant="h5" component="h2">
            Location {location.name || "No name"}
          </Typography>
          <IconButton
            onClick={() => history.push(path.replace("/show", "/edit"))}
          >
            <tableIcons.Edit />
          </IconButton>
        </div>
        <List>
          <Item val={location.address} name="Address" />
          <Item val={location.phoneNumber} name="Phone number" />
          <Item val={<EmailField email={location.email} />} name="Email" />
          <Item val={location.lat} name="Latitude" />
          <Item val={location.long} name="Longitude" />
          <Spacer height={20} />
          <ListItem>
            <ListItemText
              primary={
                <Typography component="span" variant="h5">
                  Workhours
                </Typography>
              }
            />
          </ListItem>
          <Padding side="l" size={6}>
            <Item val={location.workingHours.monday} name="Monday" />
            <Item val={location.workingHours.tuesday} name="Tuesday" />
            <Item val={location.workingHours.wednesday} name="Wednesday" />
            <Item val={location.workingHours.thursday} name="Thursday" />
            <Item val={location.workingHours.friday} name="Friday" />
            <Item val={location.workingHours.saturday} name="Saturday" />
            <Item val={location.workingHours.sunday} name="Sunday" />
          </Padding>
        </List>
      </CardContent>
    </Card>
  );
}

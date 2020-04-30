import {
  Box,
  Card,
  CardContent,
  Link as MLink,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import { storage } from "src/core/http";
import { EmailField } from "../common/EmailField";
import { Show } from "../common/ShouldShow";
import { ShowViewRow } from "../common/ShowViewItem";
import { useShowView } from "../common/hooks/useShowView";
import { useUrls } from "../common/hooks/useUrls";
import { Location } from "./Location";

export function LocationShow() {
  const [tab, setTab] = useState<0 | 1>(0);
  const { resource: location, Header } = useShowView({
    resourceName: Location.NAME,
    transform: Location.create,
  });
  const url = useUrls().panelRoot();

  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <Tabs value={tab} onChange={(_, tab) => setTab(tab)} variant="fullWidth">
          <Tab label="Info" />
          <Tab label="Gallery" />
        </Tabs>
        <CardContent>
          <Show If={tab === 0}>
            <Header title={`Location ${location?.name ?? "No name"}`} />
            <List>
              <ShowViewRow val={location?.address} name="Address" />
              <ShowViewRow val={location?.phoneNumber} name="Phone number" />
              <ShowViewRow val={<EmailField email={location?.email ?? undefined} />} name="Email" />
              <ShowViewRow val={location?.lat} name="Latitude" />
              <ShowViewRow val={location?.long} name="Longitude" />
              <ShowViewRow
                name="Arrivals"
                val={
                  <MLink component={Link} to={`${url}/arrivals?locationId=${location?.id}`}>
                    <SwapVert />
                    See all arrivals
                  </MLink>
                }
              />
              <Box height={20} />
              <ListItem>
                <ListItemText primary={<span className="text-xl">Workhours</span>} />
              </ListItem>
              <Box pl={1}>
                <ShowViewRow val={location?.workingHours?.monday} name="Monday" />
                <ShowViewRow val={location?.workingHours?.tuesday} name="Tuesday" />
                <ShowViewRow val={location?.workingHours?.wednesday} name="Wednesday" />
                <ShowViewRow val={location?.workingHours?.thursday} name="Thursday" />
                <ShowViewRow val={location?.workingHours?.friday} name="Friday" />
                <ShowViewRow val={location?.workingHours?.saturday} name="Saturday" />
                <ShowViewRow val={location?.workingHours?.sunday} name="Sunday" />
              </Box>
            </List>
          </Show>

          <Show If={tab === 1}>
            <div
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                margin: "0 auto",
                minHeight: "70vh",
              }}
              className="flex flex-col"
            >
              {location?.images.length === 0 ? (
                <div className="center h-full flex-1">
                  <Toolbar className="text-2xl py-5">No images</Toolbar>
                </div>
              ) : (
                <ImageGallery
                  // @todo fix css for this, it should be constrained
                  additionalClass="max-h-full"
                  autoPlay={false}
                  slideDuration={250}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  infinite={false}
                  lazyLoad
                  renderItem={item => (
                    <img
                      src={storage(item.original ?? "")}
                      alt={storage(item.originalAlt ?? "")}
                      style={{
                        // height: 320,
                        width: "auto",
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        margin: "0 auto",
                      }}
                    />
                  )}
                  items={
                    location?.images.map(img => ({
                      original: storage(img.md ?? ""),
                      thumbnail: storage(img.xs ?? ""),
                      fullscreen: storage(img.lg ?? ""),
                    })) ?? []
                  }
                />
              )}
            </div>
          </Show>
        </CardContent>
      </Card>
    </Fragment>
  );
}

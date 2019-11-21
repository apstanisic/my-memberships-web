import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Link as MLink,
} from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { Padding } from "components/common/Padding";
import { Spacer } from "components/common/Spacer";
import React, { Fragment, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { EmailField } from "../Common/EmailField";
import { ShowItem } from "../Common/ShowItem";
import { useShow } from "../Common/useShow";
import { useUrls } from "../Common/useUrls";
import { ShouldShow } from "../Common/ShouldShow";
import { Location } from "./Location";

export function LocationShow() {
  const [tab, setTab] = useState<0 | 1>(0);
  const [location, Header] = useShow(Location.NAME, Location.create);
  const url = useUrls().root();

  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <Tabs
          value={tab}
          onChange={(_, tab) => setTab(tab)}
          variant="fullWidth"
        >
          <Tab label="Info" />
          <Tab label="Gallery" />
        </Tabs>
        <CardContent>
          <ShouldShow show={tab === 0}>
            <Header title={`Location ${location?.name ?? "No name"}`} />
            <List>
              <ShowItem val={location?.address} name="Address" />
              <ShowItem val={location?.phoneNumber} name="Phone number" />
              <ShowItem
                val={<EmailField email={location?.email} />}
                name="Email"
              />
              <ShowItem val={location?.lat} name="Latitude" />
              <ShowItem val={location?.long} name="Longitude" />
              <ShowItem
                name="Arrivals"
                val={
                  <MLink
                    component={Link}
                    to={`${url}/arrivals?locationId=${location?.id}`}
                  >
                    <SwapVert />
                    See all arrivals
                  </MLink>
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
                <ShowItem
                  val={location?.workingHours.wednesday}
                  name="Wednesday"
                />
                <ShowItem
                  val={location?.workingHours.thursday}
                  name="Thursday"
                />
                <ShowItem val={location?.workingHours.friday} name="Friday" />
                <ShowItem
                  val={location?.workingHours.saturday}
                  name="Saturday"
                />
                <ShowItem val={location?.workingHours.sunday} name="Sunday" />
              </Padding>
            </List>
          </ShouldShow>

          <ShouldShow show={tab === 1}>
            <div
              style={{ maxWidth: "80vw", maxHeight: "80vh", margin: "0 auto" }}
            >
              <ImageGallery
                additionalClass="max-h-full"
                autoPlay={false}
                slideDuration={250}
                showPlayButton={false}
                showFullscreenButton={false}
                infinite={false}
                lazyLoad
                renderItem={item => (
                  <img
                    src={item.original}
                    alt={item.originalAlt}
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
                    original: img.sizes.md ?? "",
                    thumbnail: img.sizes.xs ?? "",
                  })) ?? []
                }
              />
            </div>
          </ShouldShow>
        </CardContent>
      </Card>
    </Fragment>
  );
}

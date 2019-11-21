import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Image } from "types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  }),
);

interface Props {
  images?: Image[];
}
export function ImageList({ images }: Props) {
  const classes = useStyles();

  if (!images) return <span></span>;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {images.map(img => (
          <GridListTile key={img.id}>
            <img src={img.sizes.sm} alt={img.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

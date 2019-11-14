import React from "react";
import { Center } from "components/common/Center";
import { Card, CardContent, makeStyles } from "@material-ui/core";
import { Image } from "components/common/Image";
import { WithChildren } from "types";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    marginTop: "-10%",
    width: 500,
    maxWidth: "100%"
  }
});

export function AuthCard({ children }: WithChildren) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div style={{ height: 100 }}>
        <Link to="/">
          <Image
            src="https://via.placeholder.com/300x100"
            height="100"
            center={true}
          />
        </Link>
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

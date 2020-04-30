import { Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "src/components/common/Image";
import { WithChildren } from "src/types";

const useStyles = makeStyles({
  card: {
    marginTop: "-10%",
    width: 500,
    maxWidth: "100%",
  },
});

/**
 * Card used for login and register
 * @Todo Add logo
 */
export function AuthCard({ children }: WithChildren) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <div style={{ height: 100 }}>
        <Link to="/">
          <Image src="https://via.placeholder.com/300x100" height="100" center={true} />
        </Link>
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

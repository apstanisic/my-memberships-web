import React from "react";
import { Padding } from "components/common/Padding";
import {
  Card,
  CardContent,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  type: "login" | "register";
}

const useStyles = makeStyles({
  card: {
    width: 500,
    maxWidth: "100%",
  },
  bottomButtons: {
    display: "flex",
    justifyContent: "stretch",
    padding: 16,
  },
});

export function AuthFooter({ type }: Props) {
  const styles = useStyles();
  return (
    <Padding side="t" size={5} className={styles.card}>
      <Paper className={styles.bottomButtons}>
        <Link
          to={`/auth/${type === "login" ? "register" : "login"}`}
          className={type === "register" ? "w-full" : "w-1/2 pr-4"}
        >
          <Button fullWidth variant="outlined" color="primary">
            {type === "login" ? "Napravi nalog" : "Uloguj se"}
          </Button>
        </Link>
        {type === "login" && (
          <Link to="/auth/password-reset" className="w-1/2">
            <Button fullWidth variant="outlined">
              Zaboravljena lozinka
            </Button>
          </Link>
        )}
      </Paper>
    </Padding>
  );
}

import { Theme } from "@material-ui/core";
import { Close, Favorite } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import { MouseEvent } from "react";
import styles from "../../styles/Discover.module.css";
import { User } from "../data/interface";
import { getAge } from "../lib/utils";

interface DiscoverProps {
  user: User;
  handleClose: (id: string) => (event: MouseEvent<HTMLButtonElement>) => void;
  handleLike: (id: string) => (event: MouseEvent<HTMLButtonElement>) => void;
}
export function Discover(props: DiscoverProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.picture}>
            <img className={styles.image} src={props.user.picture} />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>
            {props.user.firstName} {props.user.lastName},{" "}
            {getAge(props.user.dateOfBirth)}{" "}
          </p>
          <div className={styles.action}>
            <IconButton
              onClick={props.handleClose(props.user.id)}
              sx={{ boxShadow: 4 }}
              style={{ backgroundColor: "#fff", marginRight: "5px" }}
            >
              <Close style={{ color: "red" }} />
            </IconButton>
            <IconButton
              onClick={props.handleLike(props.user.id)}
              sx={{ boxShadow: 4 }}
              style={{ backgroundColor: "#fff", marginRight: "5px" }}
            >
              <Favorite style={{ color: "green" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

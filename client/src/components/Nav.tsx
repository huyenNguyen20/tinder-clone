import { MouseEvent } from "react";
import {
  CloseOutlined,
  Favorite,
  QuestionAnswer,
  ThumbUp,
} from "@material-ui/icons";
import clsx from "clsx";
import styles from "../../styles/Nav.module.css";

export enum NavType {
  Pass = "Pass",
  Discover = "Discover",
  Matches = "Matches"
}

export interface NavProps {
  handlePass: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDiscover: (event: MouseEvent<HTMLButtonElement>) => void;
  handleMatches: (event: MouseEvent<HTMLButtonElement>) => void;
  type:  NavType;
}

export function Nav(props: NavProps) {
  return (
    <>
      <div className={styles.container}>
        <button
          id="pass-btn"
          onClick={props.handlePass}
          className={clsx({
            [styles.btn]: true,
            [styles.btnLeft]: true,
            [styles.active]: props.type === "Pass",
          })}
        >
          <span className={styles.buttonContent}>
            <CloseOutlined style={{ color: "red", fontSize: "18px" }} />
            <span className={styles.name}>Pass</span>
          </span>
        </button>
        <button
          id="discover-btn"
          onClick={props.handleDiscover}
          className={clsx({
            [styles.btn]: true,
            [styles.active]: props.type === "Discover",
          })}
        >
          <span className={styles.buttonContent}>
            <Favorite style={{ color: "green", fontSize: "18px" }} />
            <span className={styles.name}>Discover</span>
          </span>
        </button>
        <button
          id="matches-btn"
          onClick={props.handleMatches}
          className={clsx({
            [styles.btn]: true,
            [styles.btnRight]: true,
            [styles.active]: props.type === "Matches",
          })}
        >
          <span className={styles.buttonContent}>
            <QuestionAnswer style={{ color: "blue", fontSize: "18px" }} />
            <span className={styles.name}>Matches</span>
          </span>
        </button>
      </div>
    </>
  );
}

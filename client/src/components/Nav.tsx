import { MouseEvent } from "react";
import styles from "../../styles/Nav.module.css";
import {
  CloseOutlined,
  Favorite,
  QuestionAnswer,
  ThumbUp,
} from "@material-ui/icons";
import clsx from "clsx";

export interface NavProps {
  handleLike: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDiscover: (event: MouseEvent<HTMLButtonElement>) => void;
  handleMatches: (event: MouseEvent<HTMLButtonElement>) => void;
  type: string;
}
export function Nav(props: NavProps) {
  return (
    <>
      <div className={styles.container}>
        <button
          onClick={props.handleLike}
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

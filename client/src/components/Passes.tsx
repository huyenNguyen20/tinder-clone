import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { User } from "../data/interface";
import { getAge } from "../lib/utils";
import { ListSubheader, Typography } from "@mui/material";
import styles from "../../styles/Pass.module.css";

interface PassedUserProps {
  users: User[];
}
export default function PassedUser(props: PassedUserProps) {
  return (
    <>
      {props.users.length === 0 && (
          <p style={{ marginLeft: "15px", color: "#2a2a2a" }}>
            Oops, the list is empty now
          </p>
        )}
      <div className={styles.imageList}>
      {props.users.length > 0 &&
          props.users.map((user: User) => (
            <SmallImageCard key={user.id}
            user={user}
            />
        ))}
      </div>
    </>
  );
}

interface UserProps {
  user: User;
}
function SmallImageCard(props: UserProps) {
  return(
    <div className={styles.smallCardContainer}>
      <div className={styles.pictureHolder}>
        <img 
        className={styles.image}
        src={props.user.picture}/>
      </div>
      <div>
        <p className={styles.info}>
          {`${props.user.firstName} ${props.user.lastName}`} <br/>
          {`${getAge(props.user.dateOfBirth)}`}
        </p>
      </div>
    </div>
  )
}

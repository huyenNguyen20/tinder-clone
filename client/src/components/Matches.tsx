import { Avatar, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { User } from "../data/interface";

interface MatchesProps {
  users: User[];
}
export function Matches(props: MatchesProps) {
  return (
    <>
      <List style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}>
        {props.users.length === 0 && (
          <p style={{ marginLeft: "15px", color: "#2a2a2a" }}>
            Oops, the list is empty now
          </p>
        )}
        {props.users.length > 0 &&
          props.users.map((user: User) => (
            <ListItem key={user.id}>
              <ListItemIcon>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src={user.picture}
                />
              </ListItemIcon>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItem>
          ))}
      </List>
    </>
  );
}

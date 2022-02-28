import { Person } from "@material-ui/icons";
import { Avatar, Typography } from "@mui/material";
import { User } from "../data/interface";
import styles from "../../styles/Header.module.css";
interface HeaderProps {
    pageName: string;
    loggedInUser: User | null;
}
export function Header(props: HeaderProps){
    return(
        <div className={styles.header}>
            <div>
                <Typography 
                id="page-title"
                variant="h6">
                    {props.pageName}
                </Typography>
            </div>
            <div>
                {props.loggedInUser ? (<Avatar 
                id="user-avatar"
                alt={props.loggedInUser.firstName}
                src={props.loggedInUser.picture}
                />)
                :(<span/>)}
            </div>
        </div>
    )
}
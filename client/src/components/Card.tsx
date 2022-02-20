import { forwardRef, MouseEvent, useEffect, useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import styles from "../../styles/Card.module.css";
import { getUsers, postLikedUser, postPassedUser } from "../data/apis";
import { User } from "../data/interface";
import { Discover } from "./Discover";
import { Nav } from "./Nav";
import { Matches } from "./Matches";
import PassedUser from "./Passes";
import { Header } from "./Header";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Card() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [passedUsers, setPassedUsers] = useState<User[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [type, setType] = useState("Discover");
  const [userIdx, setUserIdx] = useState<number>(0);
  const [alert, setAlert] = useState({ open: false });

  useEffect(() => {
    async function fetchData() {
      const {users} = await getUsers();
      if(users) {
        setUsers(users.slice(1));
        setCurrentUser(users[0]);
      }
    }
    fetchData();
  }, []);

  const incrementUserIndex = () => {
    if (users && userIdx < users.length - 1) setUserIdx(userIdx + 1);
    else setUserIdx(0);
  };
  const handleCloseBtn =
    (id: string) => async (event: MouseEvent<HTMLButtonElement>) => {
      incrementUserIndex();
      setAlert({ open: true });
      if(currentUser){
        const {users} = await postPassedUser(currentUser.id, id);
        if(users) setPassedUsers(users);
      }
    };
  const handleLikeBtn =
    (id: string) => async (event: MouseEvent<HTMLButtonElement>) => {
      incrementUserIndex();
      if(currentUser){
        const {users} = await postLikedUser(currentUser.id, id);
        if(users) setMatchedUsers(users);
      }
    };
  const handleLikePage = (event: MouseEvent<HTMLButtonElement>) => {
    setType("Pass");
  };
  const handleDiscoverPage = (event: MouseEvent<HTMLButtonElement>) => {
    setType("Discover");
  };
  const handleMatchesPage = (event: MouseEvent<HTMLButtonElement>) => {
    setType("Matches");
  };
  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="info">
          Not Feeling Good? <br />
          Keep Discovering
        </Alert>
      </Snackbar>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header pageName={type} loggedInUser={currentUser}/>
        </div>
        <div className={styles.page}>
          {Boolean(users.length) && type === "Pass" && (
            <PassedUser users={passedUsers} />
          )}
          {Boolean(users.length) && type === "Discover" && (
              <Discover
                user={users[userIdx]}
                handleClose={handleCloseBtn}
                handleLike={handleLikeBtn}
              />
          )}

          {Boolean(users.length) && type === "Matches" && (
            <Matches users={matchedUsers} />
          )}
          {!Boolean(users.length) && (
            <div className={styles.progressBar}>
              <CircularProgress />
            </div>
          )}
        </div>
        <div className={styles.nav}>
          <Nav
            handleLike={handleLikePage}
            handleDiscover={handleDiscoverPage}
            handleMatches={handleMatchesPage}
            type={type}
          />
        </div>
      </div>
    </>
  );
}

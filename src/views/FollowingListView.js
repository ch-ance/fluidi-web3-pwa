import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect, useReducer, useState } from "react";
import gun from "../gun";
const user = gun.user().recall({ sessionStorage: true });

const initialState = {
  following: [],
};

function reducer(state, peer) {
  return {
    following: [...state.following, peer],
  };
}

const useStyles = makeStyles({
  listItem: {
    border: "1px solid black",
    width: "100%",
    justifyContent: "space-between",
    wordBreak: "break-all",
  },
});

const FollowingListView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  useEffect(() => {
    gun
      .get(user.is.pub)
      .get("following")
      .map()
      .once((peer) => {
        console.log(peer);
        dispatch(peer.pub);
      });
  }, []);

  return (
    <Paper>
      <Typography variant="h2">people you know</Typography>
      <br />
      <Divider />
      <br />
      <Typography variant="h4">people you're following:</Typography>
      <br />
      <List>
        {[...new Set(state.following)].map((peer) => {
          return (
            <ListItem className={classes.listItem}>
              <Box>
                <Typography variant="body2">public key: {peer}</Typography>
              </Box>
              <IconButton
                onClick={() => {
                  gun.get(user.is.pub).get("following").get(peer).put(null);
                }}
              >
                <Close />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default FollowingListView;

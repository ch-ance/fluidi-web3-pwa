import React, { useEffect, useState, useReducer, useRef } from "react";
import gun from "../gun";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { v4 as uuidv4 } from "uuid";
const user = gun.user().recall({ sessionStorage: true });

const initialState = {
  droplets: [],
  following: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addDroplet":
      return {
        ...state,
        droplets: [...state.droplets, action.payload],
      };
    case "addFollowing":
      return {
        ...state,
        following: [...state.following, action.payload],
      };
    default:
      throw new Error(
        "action type not specified or not included in switch statement"
      );
  }
}

const useStyles = makeStyles({});

function HomeFeedView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [userPk, setUserPk] = useState("");

  useEffect(() => {
    user
      .get("following")
      .map()
      .on((f) => {
        console.log(f);
        // dispatch the "following" to state so that it can be mapped over and displayed
        dispatch({
          type: "addFollowing",
          payload: f,
        });

        // subscribe to the "following"'s droplet feed
        if (!f) return;
        gun
          .get(f)
          .get("droplets")
          .map()
          .on((d) => {
            console.log("d", d);
            dispatch({
              type: "addDroplet",
              payload: d,
            });
          });
      });
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      <h2>{user?.is?.pub}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          followPeer();
        }}
      >
        <input value={userPk} onChange={(e) => setUserPk(e.target.value)} />
        <button type="submit">follow person</button>
      </form>
      <List className={classes.messageArea}>
        {[...new Set(state.following)].map((peer) => {
          return (
            <ListItem key={peer}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={peer} />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List className={classes.messageArea}>
        {[...new Set(state.droplets)].map((drop) => {
          console.log(drop);
          return (
            <ListItem key={drop.id}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={drop.text} />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  function followPeer() {
    user.get("following").set(userPk);
  }
}

export default HomeFeedView;

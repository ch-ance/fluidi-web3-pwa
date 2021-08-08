import React, { useEffect, useState, useReducer, useRef } from "react";
import gun from "../gun";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-ui/core";
import VirtualizedList from "../components/DropletFeed/VirtualizedList";
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

const useStyles = makeStyles({
  view: {
    width: "100vw",
    wordBreak: "break-all",
  },
  peerList: {},
  dropletList: {},
});

function HomeFeedView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [dropletText, setDropletText] = useState("");

  useEffect(() => {
    gun
      .user()
      .get("following")
      .map()
      .on((f) => {
        // get the user data/follow/5_WlW9O9w-R3VCwWzTNuCILvfoUp8eKB6cqz-09Pps4.yrCHr92Er0UeE5A4iI7Rap0wE3LwYOu54_0yhOKAJyU (their alias, namely)
        // const alias = gun.user(f.pub).once().pub;
        // // dispatch "following" to state so that it can be mapped over and displayed
        // f.alias = alias;
        dispatch({
          type: "addFollowing",
          payload: f,
        });
        // if f is an empty string, GUN throws an error
        if (!f) return;
        // subscribe to the "following"'s droplet feed
        gun
          .get(f.pub)
          .get("droplets")
          .map()
          .on((d) => {
            dispatch({
              type: "addDroplet",
              payload: { droplet: d, author: f },
            });
          });
      });
  }, []);

  if (!state.droplets.length) return <h1>loading...</h1>;

  return (
    <Box className={classes.view}>
      <h1>Feed</h1>
      <p>
        Send this link to a friend so they can follow you:
        <a href={`https://fluidi.netlify.com/follow/${user?.is?.pub}`}>
          {`https://fluidi.netlify.com/follow/${user?.is?.pub}`}
        </a>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user?.is?.pub);
          gun.get(user?.is?.pub).get("droplets").set({
            text: dropletText,
            id: uuidv4(),
            author: user?.is?.pub,
            createdAt: Date.now(),
          });
        }}
      >
        <input
          value={dropletText}
          onChange={(e) => setDropletText(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            console.log(`is logged in?`, user.is);
          }}
        >
          send droplet
        </button>
      </form>
      {/* <List className={classes.peerList}>
        <Typography variant="body1">People you're following:</Typography>
        {[...new Set(state.following)].map((peer) => {
          return (
            <ListItem key={peer.pub}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={peer?.alias} />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List> */}
      <Divider />
      <VirtualizedList droplets={state.droplets} />
      {/* <List className={classes.dropletList}>
        {[...new Set(state.droplets)].map((drop) => {
          return (
            <ListItem key={drop.droplet.id}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={drop.droplet.text} />
                  <ListItemText align="right" primary={drop.author.alias} />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List> */}
    </Box>
  );
}

export default HomeFeedView;

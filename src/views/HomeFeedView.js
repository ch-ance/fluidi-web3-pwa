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
import { Button, TextField, Typography } from "@material-ui/core";
import VirtualizedList from "../components/DropletFeed/VirtualizedList";
import AutoSizer from "react-virtualized-auto-sizer";
import Droplet from "../components/DropletFeed/Droplet";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  useEffect(() => {
    gun
      .get(user.is.pub)
      .get("following")
      .map()
      .on((f) => {
        // const alias = gun.user(f.pub).once().pub;
        // // dispatch "following" to state so that it can be mapped over and displayed
        // f.alias = alias;
        // if f is an empty string, GUN throws an error
        if (!f?.pub) return;
        console.log(f);
        dispatch({
          type: "addFollowing",
          payload: f,
        });

        // subscribe to the "following"'s droplet feed
        gun
          .get(f.pub)
          .get("droplets")
          .map()
          .on((d) => {
            console.log(d);
            dispatch({
              type: "addDroplet",
              payload: { droplet: d },
            });
          });
      });
  }, []);

  return (
    <Box className={classes.view}>
      <h1>Feed</h1>
      <Button
        onClick={() => {
          history.push("/following");
        }}
      >
        View Following
      </Button>
      <Button
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }}
      >
        Click here to logout
      </Button>
      <p>
        Send this link to a friend so they can follow you:
        <a href={`https://fluidi.netlify.com/follow/${user?.is?.pub}`}>
          {`https://fluidi.netlify.com/follow/${user?.is?.pub}`}
        </a>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          gun
            .get(user.is.pub)
            .get("droplets")
            .set(
              {
                author: {
                  pub: user.is.pub,
                  alias: user.is.alias,
                },
                droplet: {
                  text: dropletText,
                  id: uuidv4(),
                  createdAt: Date.now(),
                },
              },
              (ack) => {
                console.log(ack);
                setDropletText("");
              }
            );
        }}
      >
        <TextField
          value={dropletText}
          onChange={(e) => setDropletText(e.target.value)}
        />
        <Button type="submit">send droplet</Button>
      </form>
      <Divider />
      {/* {state.droplets && (
        <AutoSizer>
          {({ height, width }) => (
            <VirtualizedList
              height={height}
              width={width}
              droplets={state?.droplets}
            />
          )}
        </AutoSizer>
      )} */}
      <List className={classes.dropletList}>
        {[...new Set(state.droplets)].map((drop) => {
          console.log(drop);
          return (
            <ListItem key={drop.droplet.id}>
              <Grid container>
                <Droplet
                  text={drop?.droplet?.text}
                  author={drop?.author?.alias}
                  createdAt={drop?.droplet?.createdAt}
                />
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default HomeFeedView;

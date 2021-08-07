import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const ChatArea = ({ messages, saveMessage, formState, onChange }) => {
  console.log(messages);
  const classes = useStyles();
  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {[...new Set(messages)]
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .map((msg) => {
                return (
                  <ListItem key={msg.id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={msg.message}></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText align="right"></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                name="message"
                id="outlined-basic-email"
                label="Type Something"
                autoFocus
                fullWidth
                value={formState.message}
                onChange={onChange}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon onClick={saveMessage} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatArea;

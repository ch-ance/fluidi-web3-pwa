import { Avatar, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import gun from "../../gun";

const useStyles = makeStyles({
  root: {
    minHeight: 100,
    border: "1px solid black",
    marginTop: 15,
    padding: 15,
  },
});

const Droplet = ({ text, author, createdAt }) => {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    gun
      .get(author)
      .get("profile")
      .get("avatarUrl")
      .on((url) => {
        setAvatarUrl(url);
      });
  }, []);

  console.log(text, author, createdAt);
  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Avatar style={{ height: 100, width: 100 }} src={avatarUrl} />
          <Typography>{text}</Typography>
          <Typography variant="caption">public key: {author}</Typography>
          <Typography>{new Date(createdAt).toString()}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Droplet;

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { Box, Card } from "@material-ui/core";
import Droplet from "./Droplet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.paper,
  },
}));

const VirtualizedList = ({ droplets, height, width }) => {
  const Row = ({ index, style }) => {
    const droplet = droplets[index];
    console.log(droplet);
    return (
      <Droplet
        style={style}
        text={droplet?.droplet.text}
        createdAt={droplet?.droplet.createdAt}
        author={droplet?.author.pub}
        avatarUrl={JSON.stringify(droplet.author)}
      />
    );
  };

  const ListComponent = () => (
    <FixedSizeList
      height={height}
      width={width  }
      itemCount={droplets.length}
      itemSize={150}
    >
      {Row}
    </FixedSizeList>
  );

  return <ListComponent />;
};

export default React.memo(VirtualizedList);

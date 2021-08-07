import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { VariableSizeList } from "react-window";
import { Box, Card } from "@material-ui/core";
import Droplet from "./Droplet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.paper,
  },
}));

const VirtualizedList = ({ droplets }) => {
  const Row = ({ index, style }) => {
    const droplet = droplets[index];

    return <Droplet text={droplet.droplet.text} />;
  };

  const getDropletSize = (index) => {
    // return a size for droplets[index]
    return 100;
  };

  const ListComponent = () => (
    <VariableSizeList
      height={window.innerHeight}
      width={window.innerWidth}
      itemCount={droplets?.length || 0}
      itemSize={getDropletSize}
    >
      {Row}
    </VariableSizeList>
  );

  return <ListComponent />;
};

export default VirtualizedList;

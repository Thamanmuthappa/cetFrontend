import React from "react";
import {
  
  
  Avatar,
 
  makeStyles,
  
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 
  
  
}));
const Testbox = (props) => {
  return (
    <Avatar variant='square' >
      {props.children}
    </Avatar>
  );
};

export default Testbox;

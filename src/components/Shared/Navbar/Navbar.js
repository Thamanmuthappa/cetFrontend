import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClubContext } from "../../../context/ClubContext";
import "./Navbar.css";

const Navbar = ({ location }) => {
  const history = useHistory();

  const { setLoginFalse } = useContext(ClubContext);

  const handleLogout = () => {
    setLoginFalse();

    history.push("/club/signin");
  };
  const useStyle = makeStyles((theme) => ({
    drawer: {
      width: 200,
      color: "#081220",
    },
  }));
  const classes = useStyle();

  return (
    <AppBar
      className="navbar"
      style={{
        background: "#081220",
        zIndex: "1400",
        position: "relative",
        borderBottom: "1px solid #F5F5F540",
      }}
      elevation={2}
    >
      <div className="c-c" style={{ color: "081220" }}>
        <Toolbar
          style={{
            background: "#081220",
          }}
        >
          <Link to={`/club/dashboard`}>
            <img src="/assets/Group2.png" alt="logo" className="nav-img" style={{width: "80%"}}/>
          </Link>
          <Typography variant="h5" className="nav-brand" style={{ flex: 1 , marginLeft: "24px"}}>
            {location}
          </Typography>
          {/* <Avatar alt="SB" /> */}
          <Button className="logout-btn-nav" onClick={handleLogout}>
            LogOut
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;

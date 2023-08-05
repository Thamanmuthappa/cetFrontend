import React, { useContext } from "react";
import { Button, Typography, AppBar, Toolbar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";

const NavbarStud = (props) => {
  const { setLoginFalse } = useContext(StudentContext);
  const history = useHistory();

  const logoutHandler = () => {
    setLoginFalse();
    history.push("/");
  };
  return (
    <>
      <AppBar
        className='navbar'
        style={{
          backgroundColor: "#fdf9f9",
          zIndex: "1400",

          position: "relative",
        }}
        elevation={2}>
        <Toolbar>
          <Link to={`/student/dashboard`}>
            <img src='/assets/Group2.png' alt='logo' className='nav-img' style={{width:"80%"}}/>
          </Link>
          <Typography variant='h5' className='nav-brand' style={{ flex: 1 }}>
            Dashboard
          </Typography>
          <Button className='logout-btn-nav' onClick={logoutHandler}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export default NavbarStud;

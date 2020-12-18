import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Grid } from "@material-ui/core";

const AllDomains = () => {
  const [clubs, setClubs] = useState();
  const [err, setErr] = useState();
  useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/club/allFeatured`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setClubs(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  }, []);
  console.log(clubs);

  if (err) {
    return <div>err</div>;
  } else if (clubs) {
    let techClubs = [];
    for (let x in clubs.clubs) {
      if (x.type.toLowerCase() === "technical") {
        techClubs.push(x);
      }
    }
    console.log(techClubs);
    return <Grid container></Grid>;
  } else {
    return <div>loading</div>;
  }
};
function Ite(props) {
  return (
    <Paper>
      <h2>dccd</h2>
      <p>dsaad</p>

      <Button className='CheckButton'>Check it out!</Button>
    </Paper>
  );
}

export default AllDomains;

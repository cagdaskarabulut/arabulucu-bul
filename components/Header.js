import styles from "./Header.module.scss";
import { Chip, Container, Grid } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Header = ({}) => {
  return (
    <Container className={styles.header}>
      <Grid
        container
        columns={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <h1 className={styles.logoStyle}><a style={{textDecoration:"none",color:"inherit"}} href="/">Arabulucu Bul</a></h1>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;

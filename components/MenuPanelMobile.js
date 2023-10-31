import * as React from "react";
import styles from "./MenuPanelMobile.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useRouter } from "next/router";
import { useState } from "react";

function MenuPanelMobile() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const router = useRouter();
  function handleEmailClick() {
    window.location.href = "mailto:" + "oznurilhan@windowslive.com";
  }

  function handleLocationClick() {
    window.open(
      "https://www.google.com/maps/place/%C4%B0stanbul+Anadolu+Adalet+Saray%C4%B1/@40.9149637,29.1758131,17z/data=!3m1!4b1!4m6!3m5!1s0x14cac461555a9809:0x1e0173e0877c9506!8m2!3d40.9149597!4d29.178388!16s%2Fg%2F12qf9c82t?authuser=0&entry=ttu"
    );
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavClose = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavMenu = (page) => {
    setAnchorElNav(null);
    router.push("/" + page);
  };

  return (
    <AppBar className={styles.menuPanelStyle} position="fixed">
      <Container disableGutters={true} maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-around",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className={styles.menuFont}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleNavClose}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="Arabuluculuk" onClick={() => handleNavMenu("")}>
                <Typography textAlign="center">Arabulucu Listesi</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-around",
            }}
          >
            <h1 className={styles.logoStyle}>Arabulucu-bul.com.tr</h1>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-around",
            }}
          >
            {/* <Button
              id="basic-button"
              className={styles.menuFont}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<LocalPhoneIcon />}
            ></Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuPanelMobile;

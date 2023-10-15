import styles from "./MenuPanel.module.scss";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export default function Menu() {

  const router = useRouter();

  return (
    <Container
      className={styles.menuPanelStyle}
      disableGutters={true}
      maxWidth="xl"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between !important" ,
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 10,
          marginRight: 10,
          width: "100%",
          button: {
            flex: "none",
          },
        }}
      >
        <Button href={"/"} 
        className={(router.pathname == "/" || router.pathname == "/")  ? styles.menuButtonStyleSelected : styles.menuButtonStyle}
        >
          Arabulucu Listesi
        </Button>
      </Box>
    </Container>
  );
}

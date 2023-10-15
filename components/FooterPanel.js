import styles from "./FooterPanel.module.scss";
import { Grid } from "@mui/material";
import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import MyGrid from "./tools/MyGrid";

// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import EmailIcon from "@mui/icons-material/Email";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const FooterPanel = () => {
  //_ MobilePart
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  const LeftContent = () => {
    return (
      <>
        <div className={styles.footerContentStyle}>
          © Copyright 2023 Arabulucu.info.
          {isMobile ? " " : <br />}
          Tüm Hakları Saklıdır.
          {isMobile ? " " : <br />}
          Tasarım Karabulut Yazılım.
        </div>
      </>
    );
  };

  const RightContent = () => {
    return (
      <>
        <div className={styles.footerContentStyle}>
          Bu sitede paylaşılan bilgiler yalnızca bilgilendirme amaçlı olup,
          Türkiye Cumhuriyeti Barolar Birliği’nin ilgili düzenlemeleri
          uyarınca reklam, teklif, hukuki öneri veya danışmanlık teşkil etmez.
          Sitede sunulan bilgiler hakkında Arabulucu.info sitesi sorumluluk
          kabul etmez. Bu sitede paylaşılan bilgiler, ve sair veriler
          Arabulucu.info'a ait olup, büronun yazılı izni olmaksızın
          kullananlar hakkında yasal işlem yapılır.
        </div>
      </>
    );
  };

  return (
    <div className={styles.footerStyle}>
      <MyGrid leftContent={<LeftContent />} contentPosition="center" isOneFullContent={true} />
    </div>
  );
};

export default FooterPanel;

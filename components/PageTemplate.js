import styles from "./PageTemplate.module.scss";
import Header from "./Header";
import MenuPanel from "./MenuPanel";
import { useCallback, useContext, useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "./FooterPanel";
import MenuPanelMobile from "./MenuPanelMobile";
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";

//- Açılış sayfası , Hizmetlerimiz sayfası
const PageTemplate = ({ content }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  const HeaderField = () => {
    if (isMobile) {
      return <></>;
    } else {
      return <Header />;
    }
  };

  const MenuField = () => {
    if (isMobile) {
      return <MenuPanelMobile />;
    } else {
      return <MenuPanel />;
    }
  };

  return (
    <div className={styles.BodyStyle}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8KTDF3483E" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-8KTDF3483E');
        `}
      </Script>
      <div className={styles.HeaderStyle}>
        <HeaderField />
        <MenuField />
      </div>
      <div className={styles.ContentStyle}>
        {content}
      </div>
      <div className={styles.FooterStyle}>
        <FooterPanel />
      </div>
      <Analytics />
    </div>
  );
}

export default PageTemplate;
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
          © Copyright 2023 Arabulucu-bul.com.tr.
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
          
        </div>
      </>
    );
  };

 const LeftContent = () => {
    return (
      <>
        <div className={styles.footerContentStyle}>
          Yasal Uyarı ve Bilgilendirme
          <br/>
          Bu sitede paylaşılan bilgiler yalnızca bilgilendirme amaçlı olup,
          Türkiye Cumhuriyeti Barolar Birliği’nin ilgili düzenlemeleri
          uyarınca reklam, teklif, hukuki öneri veya danışmanlık teşkil etmez.
          Sitede sunulan bilgiler hakkında Arabulucu-bul.com.tr sitesi sorumluluk
          kabul etmez. Bu sitede paylaşılan bilgiler, ve sair veriler
          Arabulucu-bul.com.tr'a ait olup, büronun yazılı izni olmaksızın
          kullananlar hakkında yasal işlem yapılır.
            <br/>
          Bu internet sitesinde yer alan tüm bilgiler, 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu ve ilgili yönetmeliklere uygun olarak hazırlanmıştır. Sitemizde sunulan içerikler yalnızca bilgilendirme amaçlıdır ve resmi Arabulucular Sicili verilerine dayanmaktadır.
          Sitede yer alan arabulucuların kişisel bilgileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) hükümleri çerçevesinde, kendilerinin açık rızası ile paylaşılmaktadır. Kullanıcıların, burada yer alan bilgileri başka bir amaçla kullanmamaları ve ticari faaliyetlerde bulunmamaları gerektiğini önemle hatırlatırız.
          Bu platform, reklam veya yönlendirme amacı taşımamakta olup yalnızca arabuluculuk hizmetleriyle ilgili doğru ve güvenilir bilgi sağlama hedefindedir. Arabuluculuk faaliyetlerine ilişkin daha fazla bilgi için lütfen Adalet Bakanlığı Arabuluculuk Daire Başkanlığı ile iletişime geçiniz.
        </div>
      </>
    );
  };

  return (
    <div className={styles.footerStyle}>
      <MyGrid leftContent={<LeftContent />} rightContent={<RightContent />} />
    </div>
  );
};

export default FooterPanel;

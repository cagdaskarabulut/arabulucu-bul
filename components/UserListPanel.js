import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function Index() {
  function handleEmailClick() {
    window.location.href = "mailto:" + "oznurilhan@windowslive.com";
  }
  return (
    <>
    <Card variant="outlined" sx={{ maxWidth: 500, fontSize:16 }}>
      <CardContent>
        
        <h3>Avukat Arabulucu
          Öznur İlhan Karabulut</h3>
        <p style={{fontSize: 14}}>
        2010 YILINDA MALTEPE ÜNİVERSİTESİ HUKUK FAKÜLTESİNDEN MEZUN OLMASININ ARDINDAN ÖZEL HUKUK ALANINDA ÇALIŞMA HAYATI OLMUŞTUR. 2020 YILINDA ARABULUCULUK DAİRE BAŞKANLIĞI SİCİLİNE KAYIT OLARAK 12511 SİCİL NOLU ARBULUCU OLARAK GÖREV YAPMAYA BAŞLAMIŞTIR.
        </p>
      </CardContent>
      <CardActions style={{justifyContent: 'space-between'}}>
        <Button href={"https://www.arabulucu.info/"} size="small">
          Kişisel Web Sitesi
        </Button>
        {/* <Button size="small" onClick={handleEmailClick}> */}
        <Button size="small" onClick={() => window.open ('https://arabulucu.info/iletisim', '_ blank')}>
          İletişim
        </Button>
      </CardActions>
    </Card>
    </>
  );
}
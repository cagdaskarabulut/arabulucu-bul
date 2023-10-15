import MetaPanel from '../components/MetaPanel';
import PageTemplate from '../components/PageTemplate';
import UserListPanel from '../components/UserListPanel';

//- Açılış sayfası
export default function Home() {
  return (
    <>
      <MetaPanel
        title="Arabulucu Bul"
        descriptionContent="Arabulucu ve avukatların listesi"
        keywordsContent="arabulucu, arabulucu bul, arabulucu nasıl bulurum, arabulucu listesi, iyi bir arabulucu arıyorum, iyi bir avukat arıyorum, arabulucu ile anlaş, arabulucu tut"
        imagePath="/images/arabulucu-bul.png"
        imageAlt="arabulucu-bul"
      />
      <PageTemplate content={<UserListPanel />} />
    </>
  );
}

import { useTranslation } from 'react-i18next';

function App() {

  const { t } = useTranslation() // key to translate languages

  return (
    <div className="App">
      <p>
        {t('title')}
      </p>
    </div>
  );
}

export default App;

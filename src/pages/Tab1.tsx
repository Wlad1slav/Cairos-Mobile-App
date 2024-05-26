import {IonContent, IonPage} from '@ionic/react';

import './Tab1.css';
import AppReminder from "../components/AppReminder";


const Tab1: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>

          <AppReminder heading='Попий води' imagePath='https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg'>
              Вода є життєво необхідною для здоров'я 💧. Вона підтримує функціонування організму, покращує обмін речовин,
              виводить токсини та підтримує баланс рідин ⚖️. Пити достатньо води щодня допомагає підтримувати енергію ⚡,
              концентрацію 🧠 та загальний стан здоров'я 💪.
          </AppReminder>


      </IonContent>

    </IonPage>
  );
};

export default Tab1;

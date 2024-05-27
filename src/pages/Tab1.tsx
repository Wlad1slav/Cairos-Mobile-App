import {IonContent, IonPage} from '@ionic/react';

import AppReminder from "../components/AppReminder";
import AppHeader from "../components/AppHeader";

import './Tab1.css';


const Tab1: React.FC = () => {
  return (
    <IonPage>

      <AppHeader />

      <IonContent fullscreen>

          <div className="reminds-wall">
              <AppReminder heading='Попий води' imagePath='https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg'>
                  Вода є життєво необхідною для здоров'я. Вона підтримує функціонування організму, покращує обмін речовин та підтримує баланс рідин ️.
              </AppReminder>

              <AppReminder heading='Свіже повітря' imagePath='https://st2.depositphotos.com/3733299/5252/i/450/depositphotos_52527605-stock-photo-bench-and-fresh-air.jpg'>
                  Відвідайте парки і ліси, щоб наповнити день свіжим повітрям і зарядитися енергією природи. Дихайте глибше!
              </AppReminder>

              <AppReminder heading='Ранкова кава' imagePath='https://denzadnem.com.ua/wp-content/uploads/2023/05/kava-bez-kofeinu-1.jpg'>
                  Почніть день з чашки ароматної кави. Це подарує вам заряд бадьорості та натхнення на весь день.
              </AppReminder>

              <AppReminder heading='Активний відпочинок' imagePath='https://dorogovkaz.com/images/aktivniy_otdyh/aktivniy_otdyh_photo.jpg'>
                  Займайтеся спортом або прогулянками. Активний відпочинок допоможе підтримати фізичну форму і покращить настрій.
              </AppReminder>

              <AppReminder heading='Час для себе' imagePath='https://pic.sport.ua/images/news/0/12/29/orig_485870.jpg'>
                  Знайдіть час для улюбленого хобі або медитації. Це допоможе розслабитися і знайти внутрішній спокій.
              </AppReminder>
          </div>

      </IonContent>

    </IonPage>
  );
};

export default Tab1;

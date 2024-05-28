import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const TabRegistration: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Реєстрація</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Реєстрація</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Реєстрація" />
      </IonContent>
    </IonPage>
  );
};

export default TabRegistration;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const TabAuthorization: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Авторизація</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Авторизація" />
      </IonContent>
    </IonPage>
  );
};

export default TabAuthorization;

import React from "react";
import { IonPage } from '@ionic/react';

import AppHeader from "../components/AppHeader";
import AppContent from "../components/AppContent";
import FormLogin from "../forms/FormLogin";

import requests from "../config/requests.config";

const TabAuthorization: React.FC = () => {
  return (
      <IonPage>
          <AppHeader />
          <AppContent requiredAuthorization={false} guest={true}>
              <FormLogin request={requests.post.auth.login} />
          </AppContent>
      </IonPage>
  );
};

export default TabAuthorization;

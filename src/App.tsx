import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* SCSS for Cairosu */
import './stylesheet/app.scss'

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import routes from "./config/routes.config";
import navigationElements from "./config/navigation.config";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>

        <IonTabs>

          <IonRouterOutlet>
            {
              // Generation of all routes
              Object.keys(routes).map((key) => {
                const { url, tabComponent } = routes[key];
                return <Route exact path={url} component={tabComponent} />;
              })
            }

            {/* Redirect to the main page */}
            <Route exact path="/">
              <Redirect to={routes.base.url} />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            {
              // Generation of navigation elements
              Object.keys(navigationElements).map((key) => {
                const { label, href, icon } = navigationElements[key];
                return (
                    <IonTabButton tab={key} href={href}>
                      <IonIcon aria-hidden="true" icon={icon} />
                      <IonLabel>{label}</IonLabel>
                    </IonTabButton>
                );
              })
            }
          </IonTabBar>

        </IonTabs>
      </IonReactRouter>
    </IonApp>
);

export default App;

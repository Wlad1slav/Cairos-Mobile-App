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
import {alarmSharp, diamond, home, person, settings, star} from 'ionicons/icons';
import TabTodos from './pages/TabTodos';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import AppHeader from "./components/AppHeader";
import TabHome from "./pages/TabHome";
import TabRating from "./pages/TabRating";
import TabProfile from "./pages/TabProfile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonTabs>

        <IonRouterOutlet>

          {/* TODO */}
          <Route exact path="/home">
            <TabHome />
          </Route>

          {/* A page with reminders, advice on what to do for the user today */}
          <Route exact path="/reminds">
            <TabTodos />
          </Route>

          {/* TODO */}
          <Route exact path="/rating">
            <TabRating />
          </Route>

          {/* TODO */}
          <Route exact path="/profile">
            <TabProfile />
          </Route>

          {/* Redirect to the main page */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">

          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Головна</IonLabel>
          </IonTabButton>

          <IonTabButton tab="reminds" href="/reminds">
            <IonIcon aria-hidden="true" icon={alarmSharp} />
            <IonLabel>Нагадування</IonLabel>
          </IonTabButton>

          <IonTabButton tab="rating" href="/rating">
            <IonIcon aria-hidden="true" icon={star} />
            <IonLabel>Рейтинг</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Профіль</IonLabel>
          </IonTabButton>

          {/*<IonTabButton tab="tab4" href="/tab3">*/}
          {/*  <IonIcon aria-hidden="true" icon={diamond} />*/}
          {/*  <IonLabel>Преміум</IonLabel>*/}
          {/*</IonTabButton>*/}
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

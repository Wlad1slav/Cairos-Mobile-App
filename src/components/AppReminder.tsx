import {IonText} from "@ionic/react";
import {ReactNode} from "react";

import './AppReminder.scss';
import '../stylesheet/container.scss';

interface Reminder {
    heading: string,
    imagePath: string,
    children: ReactNode;
}

function AppReminder({heading, imagePath, children}: Reminder) {
    return (
        <div className="reminder">
            <img src={imagePath} alt={imagePath}/>
            <div className="content">
                <IonText color="primary">
                    <h3>{heading}</h3>
                </IonText>
                <IonText color='dark'>
                    <p>{children}</p>
                </IonText>
            </div>
        </div>
    );
}

export default AppReminder;
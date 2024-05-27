import {IonText} from "@ionic/react";
import {ReactNode} from "react";

import './AppReminder.scss';
import '../stylesheet/container.scss';

interface Reminder {
    heading: string
    imagePath: string
    children: ReactNode
    isDone: boolean
}

function AppReminder({heading, imagePath, isDone, children}: Reminder) {
    return (
        <div className={['reminder', isDone ? 'done' : ''].join(' ')}>
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
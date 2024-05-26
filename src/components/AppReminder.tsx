import {IonImg} from "@ionic/react";
import {ReactNode} from "react";

import './AppReminder.scss';

interface Reminder {
    heading: string,
    imagePath: string,
    children: ReactNode;
}

function AppReminder({heading, imagePath, children}: Reminder) {
    return (
        <div className="container">

            <div className="reminder">
                <IonImg src={imagePath} />
                <h2>{heading}</h2>
                <p>{children}</p>
            </div>

        </div>
    );
}

export default AppReminder;
import React, {ReactNode} from "react";
import {PredefinedColors} from "@ionic/core";
import {IonIcon} from "@ionic/react";

import './AppNotification.scss';

interface AppNotificationProps {
    children: ReactNode;
    color?: PredefinedColors;
    icon?: string;

}

const AppNotification: React.FC<AppNotificationProps> = ({children, icon, color = 'primary'}) => {
    return (
        <div className={`notification ${color}`}>
            <IonIcon icon={icon} color={color} size={'large'} />
            {children}
        </div>
    );
}

export default AppNotification;
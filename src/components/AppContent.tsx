import React, {ReactNode, useEffect, useState} from "react";
import {IonContent} from "@ionic/react";

import Item from "../hooks/item.interface";
import {useStorage} from "../hooks/useStorage";
import storageKeys from "../config/storages.config";

interface AppContent {
    children: ReactNode;
    requiredAuthorization?: boolean;
}

const AppContent: React.FC<AppContent> = ({ children, requiredAuthorization = true }) => {

    const [isAuthorized, setAuthorized] = useState(false);

    // Obtaining a token for authorization
    const {rows} = useStorage<string>(storageKeys.token);

    // If there is no token for authorization, then
    // a container will be displayed with an offer to register
    useEffect(() => {
        if (rows.length !== 0) {
            setAuthorized(true);
        }
    }, [rows]);

    return (
        <IonContent fullscreen>
            {(!requiredAuthorization || isAuthorized) ? children : 'Авторизуйтесь будь ласка'}
        </IonContent>
    )
}

export default AppContent;
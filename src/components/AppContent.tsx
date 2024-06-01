import React, {ReactNode, useEffect, useState} from "react";
import {IonContent} from "@ionic/react";

import {useStorage} from "../hooks/useStorage";

import AppAuthOffer from "./AppAuthOffer";

import storageKeys from "../config/storages.config";

interface AppContent {
    children: ReactNode;
    requiredAuthorization?: boolean;
    guest?: boolean;
}

const AppContent: React.FC<AppContent> = ({ children, requiredAuthorization = true, guest = false }) => {

    const [isAuthorized, setAuthorized] = useState(false);

    // Obtaining a token for authorization
    const {rows} = useStorage<string>(storageKeys.token);

    // If there is no token for authorization, then
    // a container will be displayed with an offer to register
    useEffect(() => {
        if (rows.length !== 0) {
            setAuthorized(true);
            if (guest) {
                // If the page is created for unregistered users,
                // then registered users will be redirected to the main page
                window.location.href = '/';
            }
        }
    }, [rows]);

    return (
        <IonContent fullscreen>
            {(!requiredAuthorization || isAuthorized) ? children : <AppAuthOffer />}
        </IonContent>
    )
}

export default AppContent;
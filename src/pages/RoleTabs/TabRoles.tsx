import React, {useEffect, useState} from "react";
import {IonButton, IonPage} from '@ionic/react';

import AppContent from "../../components/AppContent";
import AppHeader from "../../components/header/AppHeader";
import MyRoleForWeek from "../../components/roles/MyRoleForWeek";
import AppProgressWeek from "../../components/blocks/AppProgressWeek";
import {useStorage} from "../../hooks/useStorage";

import storageKeys from "../../config/storages.config";
import isDateThisWeek from "../../utils/datetime.isDateThisWeek";
import routes from "../../config/routes.config";
import RequestAuthorized from "../../utils/request.authorized.class";
import requests from "../../config/requests.config";


const TabRoles: React.FC = () => {

    // The user has a selected role for this week
    const [hasRoleForWeek, setHasRoleForWeek] = useState(false);

    // Actual role for a week
    const [relevantRole, setRelevantRole] = useState<RoleModel>({
        id: -1,
        role: '',
        parts: []
    });
    const {rows: roleFromStorage} = useStorage<RoleStorage>(storageKeys.roleForWeek);

    // Obtaining a token for the request API
    const { rows: tokenRows } = useStorage<string>(storageKeys.token);
    const token = tokenRows[0]?.values;

    // Checking the relevance of the role. Checking if the role has expired.
    useEffect(() => {
        const roleSetDate = new Date(roleFromStorage[0]?.values.date);
        setHasRoleForWeek(roleFromStorage && isDateThisWeek(roleSetDate));
    }, [roleFromStorage]);

    // At the moment when the token is received and if the term of the role has not expired,
    // a request is sent to the server to obtain the current role
    useEffect(() => {
        if (token && hasRoleForWeek) {
            const roleId = roleFromStorage[0]?.values.roleId;
            const request = new RequestAuthorized(token);
            const response = request.get<RoleModel>(`${requests.get.roles.certain}?roleId=${roleId}`);
            response.then((role) => {
                setRelevantRole(role);
            });
        }
    }, [roleFromStorage, hasRoleForWeek, token]);


    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <AppProgressWeek />
                <h1 style={{textAlign: "center"}}>Роль</h1>

                <div style={{display: "flex", justifyContent: "center"}}>
                {
                    hasRoleForWeek ? <MyRoleForWeek {...relevantRole} />
                        : <IonButton href={routes.roleSelectOwn.url}>Вибрати роль на тиждень</IonButton>
                }
                </div>
            </AppContent>
        </IonPage>
    );
};

export default TabRoles;
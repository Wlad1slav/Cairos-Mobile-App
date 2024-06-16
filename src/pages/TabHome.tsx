import React, {useEffect, useState} from "react";
import {IonPage} from '@ionic/react';

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";
import AppPanelProgressAge from "../components/AppPanelProgressAge";
import AppTimeBeforeSleep from "../components/AppTimeBeforeSleep";
import AppTimeBeforeYearEnd from "../components/AppTimeBeforeYearEnd";
import AppPanelProgressWeek from "../components/AppPanelProgressWeek";
import AppCairosAccent from "../components/AppCairosAccent";
import AppPanelConcentration from "../components/AppPanelConcentration";
import AppPanelActions from "../components/AppPanelActions";

import {useStorage} from "../hooks/useStorage";
import storageKeys from "../config/storages.config";
import requests from "../config/requests.config";
import RequestAuthorized from "../utils/request.authorized.class";
import {isProfileData, UserModel} from "../models/user.model";

import './TabHome.scss';

const TabHome: React.FC = () => {

    const {rows} = useStorage<string>(storageKeys.token);

    const token = rows[0]?.values;

    const [authorizedUser, setAuthorizedUser] = useState<UserModel>();

    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get(requests.get.profile.data);
            response.then((value) => {
                if (isProfileData<UserModel>(value)) {
                    setAuthorizedUser(value);
                }
            });
        }
    }, [token]);

    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <div className="tab-header">
                    <div className="row">
                        <div className='block' style={{width: '50%'}}>
                            <AppPanelProgressAge birthday={authorizedUser?.birthday_date} />
                        </div>

                        <div className='block' style={{width: '50%'}}>
                            <div className="subblock">
                                <AppTimeBeforeSleep />
                            </div>
                            <div className="subblock">
                                <AppTimeBeforeYearEnd />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className='block' style={{width: '100%'}}>
                            <AppPanelProgressWeek />
                        </div>
                    </div>
                </div>

                <div className="cards">
                    <div className="card secondary">
                        <AppPanelConcentration />
                    </div>

                    <div className="card tertiary">
                        <AppCairosAccent />
                    </div>
                </div>

                <div className="content">
                    <AppPanelActions />
                </div>

            </AppContent>
        </IonPage>
    );
};

export default TabHome;

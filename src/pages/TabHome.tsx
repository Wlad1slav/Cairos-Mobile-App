import React, {useEffect, useState} from "react";
import {IonPage} from '@ionic/react';

import AppContent from "../components/AppContent";
import AppHeader from "../components/header/AppHeader";
import AppProgressAge from "../components/blocks/AppProgressAge";
import AppTimeBeforeSleep from "../components/blocks/AppTimeBeforeSleep";
import AppTimeBeforeYearEnd from "../components/blocks/AppTimeBeforeYearEnd";
import AppProgressWeek from "../components/blocks/AppProgressWeek";
import AppCairosAccent from "../components/blocks/AppCairosAccent";
import AppConcentration from "../components/blocks/AppConcentration";
import AppActions from "../components/blocks/AppActions";

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
                            <AppProgressAge birthday={authorizedUser?.birthday_date} />
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
                            <AppProgressWeek />
                        </div>
                    </div>
                </div>

                <div className="cards">
                    <div className="card secondary">
                        <AppConcentration />
                    </div>

                    <div className="card tertiary">
                        <AppCairosAccent />
                    </div>
                </div>

                <div className="content">
                    <AppActions />
                </div>

            </AppContent>
        </IonPage>
    );
};

export default TabHome;

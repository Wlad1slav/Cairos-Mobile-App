import React from "react";
import {IonItem, IonItemSliding, IonList, IonPage} from '@ionic/react';

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";
import AppPanelProgressAge from "../components/AppPanelProgressAge";
import AppTimeBeforeSleep from "../components/AppTimeBeforeSleep";

import './TabHome.scss';
import AppTimeBeforeYearEnd from "../components/AppTimeBeforeYearEnd";
import AppPanelProgressWeek from "../components/AppPanelProgressWeek";
import AppCairosAccent from "../components/AppCairosAccent";
import AppRole from "../components/AppRole";
import AppPanelConcentration from "../components/AppPanelConcentration";

const TabHome: React.FC = () => {
    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <div className="tab-header">
                    <div className="row">
                        <div className='block' style={{width: '50%'}}>
                            <AppPanelProgressAge />
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

                <div className="middle-content">
                    <AppPanelConcentration />
                </div>

                <div className="content">
                    <AppCairosAccent />

                    {/*<AppRole />*/}
                    {/*<AppRole />*/}
                    {/*<AppRole />*/}

                    <IonList>
                        <IonItem>
                            <AppRole />
                        </IonItem>

                        <IonItem>
                            <AppRole />
                        </IonItem>

                        <IonItem>
                            <AppRole />
                        </IonItem>
                    </IonList>
                </div>

            </AppContent>
        </IonPage>
    );
};

export default TabHome;

import React, {useState, useEffect} from 'react';
import {IonIcon, IonFabButton} from '@ionic/react';

import {add, alarm, happy} from "ionicons/icons";

import AppModal from "./AppModal";
import FormConcentrationLevel from "../forms/FormConcentrationLevel";

import requests from "../config/requests.config";

import './AppPanelConcentration.scss';

const AppPanelConcentration: React.FC = () => {
    const now = new Date();

    const [minutesRemaining, setMinutesRemaining] = useState(0);

    useEffect(() => {
        setMinutesRemaining(60 - now.getMinutes());
    }, [now]);

    return (
        <div className='panel--concentration'>
            <h2>Рівень концентраії</h2>
            <div className="blocks">
                <div className="item">
                    <p className="accent">
                        <IonIcon icon={alarm} />
                        {minutesRemaining} хв.
                    </p>
                    <p>до наступної години</p>
                </div>

                <div className="item middle">
                    <p className='accent'>
                        <IonIcon icon={happy} />
                        9
                    </p>
                    <p>це гарно</p>
                </div>

                <div className="item">
                    <IonFabButton color={'secondary'} size={'small'} id='open-modal-concentration'>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>

                    <AppModal trigger='open-modal-concentration' title='Рівень концетраії'>
                        <FormConcentrationLevel request={requests.post.concentration.store} />
                    </AppModal>

                </div>
            </div>
        </div>
    );
}

export default AppPanelConcentration;
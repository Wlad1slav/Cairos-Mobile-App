import React, {useState, useEffect} from 'react';
import {IonIcon, IonFabButton} from '@ionic/react';

import {alarm, happy} from "ionicons/icons";

import AppModal from "./AppModal";
import FormConcentrationLevel from "../forms/FormConcentrationLevel";
import {useStorage} from "../hooks/useStorage";

import requests from "../config/requests.config";
import storageKeys from "../config/storages.config";

import './AppPanelConcentration.scss';
import concentrationLevelsConfig from "../config/concentration-levels.config";

const AppPanelConcentration: React.FC = () => {
    const now = new Date();

    const [minutesRemaining, setMinutesRemaining] = useState(0);
    const [isLevelInstalled, setIsLevelInstalled] = useState(false);

    const {rows} = useStorage<{level: number, dateTime: string}>(storageKeys.concentrationLevel);
    const nowHours = new Date().getHours();

    /* Checks if the concentration level has been set at this hour. If so, isLevelInstalled is set to true,
    which will show the person's concentration level. */
    useEffect(() => {
        const levelInstallationDate = new Date(rows[0]?.values.dateTime);
        if (levelInstallationDate.getHours() === nowHours) {
            setIsLevelInstalled(true);
        } else {
            setIsLevelInstalled(false);
        }
    }, [rows, nowHours]);

    /* Counts how many minutes are left until the end of the hour */
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

                {isLevelInstalled ? <div className="item">
                    <p className='accent'>
                        {rows[0]?.values.level}
                        {
                            concentrationLevelsConfig[rows[0]?.values.level as keyof typeof concentrationLevelsConfig].emoji
                        }
                    </p>
                    <p>{
                        concentrationLevelsConfig[rows[0]?.values.level as keyof typeof concentrationLevelsConfig].text
                    }</p>
                </div> :
                <div className="item">
                    <IonFabButton color={'secondary'} size={'small'} id='open-modal-concentration'>
                        {/*<IonIcon icon={add}></IonIcon>*/}
                        <p>SET</p>
                    </IonFabButton>

                    <AppModal trigger='open-modal-concentration' title='Рівень концетраії'>
                        <FormConcentrationLevel requestLink={requests.post.concentration.store} />
                    </AppModal>

                </div>}

            </div>
        </div>
    );
}

export default AppPanelConcentration;
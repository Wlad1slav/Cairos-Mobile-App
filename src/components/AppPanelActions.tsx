import React from "react";
import {IonFabButton, IonIcon} from "@ionic/react";
import { bookmark, brush, checkmark, help, pencil } from "ionicons/icons";

import './AppPanelActions.scss';

const AppPanelActions: React.FC = () => {

    return (
        <div className='panel--actions'>
            <div className="action">
                <div className="label">
                    <IonIcon icon={bookmark} size='large' />
                    <h3>Ціль</h3>
                </div>

                <div className='essence'>
                    Завершити поточний проект до кінця дня.
                </div>

                <div></div>

            </div>

            <div className="action">
                <div className="label">
                    <IonIcon icon={help} size='large' />
                    <h3>Питання</h3>
                </div>

                <div className='essence'>
                    Як я можу зробити сьогоднішній день більш продуктивним?
                </div>

                <IonFabButton style={{minWidth: "40px"}}  color={'dark'} size={'small'} id='open-modal-concentration'>
                    <IonIcon icon={pencil}></IonIcon>
                </IonFabButton>
            </div>

            <div className="action">
                <div className="label">
                    <IonIcon icon={brush} size='large' />
                    <h3>Дія</h3>
                </div>

                <div className='essence'>
                    Зробити перерву на 10 хвилин після кожної години роботи.
                </div>

                <IonFabButton style={{minWidth: "40px"}}  color={'dark'} size={'small'} id='open-modal-concentration'>
                    <IonIcon icon={checkmark}></IonIcon>
                </IonFabButton>
            </div>
        </div>
    )
}

export default AppPanelActions;
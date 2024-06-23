import React from "react";

import {IonFabButton, IonIcon} from "@ionic/react";

import AppModal from "../general/AppModal";

import './AppAction.scss';

const AppAction: React.FC<{
    label: string;
    labelIcon: string;
    text: string;
    button?: { id?: string; icon: string; action?: () => void };
    modal?: { trigger: string; title: string; children: JSX.Element; }
}> = ({label, labelIcon, text, button, modal}) => {
    return (
        <div className="action">
            <div className="label">
                <IonIcon icon={labelIcon} size='large' />
                <h3>{label}</h3>
            </div>

            <div className='essence'>
                {text}
            </div>

            <div className="button">
                {button && <IonFabButton
                    style={{minWidth: "40px"}}
                    color={'dark'}
                    size={'small'}
                    id={button.id}>
                    <IonIcon icon={button.icon}></IonIcon>
                </IonFabButton>}
            </div>

            {
                modal && <AppModal trigger={modal.trigger} title={modal.title}>
                    {modal.children}
                </AppModal>
            }
        </div>
    );
}

export default AppAction;
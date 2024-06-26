import React from "react";
import {IonFabButton, IonIcon} from "@ionic/react";
import {add} from "ionicons/icons";

const CreateRoleButton: React.FC<{}> = ({}) => {
    return (
        <>
            <IonFabButton color={'primary'} size={'small'}>
                <IonIcon icon={add}></IonIcon>
            </IonFabButton>
        </>
    )
}

export default CreateRoleButton;
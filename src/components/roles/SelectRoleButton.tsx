import React from "react";
import {IonFabButton, IonIcon, IonToast} from "@ionic/react";
import {checkmark} from "ionicons/icons";

const SelectRoleButton: React.FC<Readonly<{selectRole: () => void}>> = ({selectRole}) => {
    return (
        <>
            <IonFabButton color={'tertiary'} onClick={selectRole} id='open-toast-role-selected'>
                <IonIcon icon={checkmark}></IonIcon>
            </IonFabButton>
            <IonToast trigger="open-toast-role-selected" message="Роль вибрана" duration={2000} />
        </>
    );
}

export default SelectRoleButton;
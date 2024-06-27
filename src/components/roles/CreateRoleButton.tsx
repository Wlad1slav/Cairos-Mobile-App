import React from "react";
import {IonFabButton, IonIcon} from "@ionic/react";
import {add} from "ionicons/icons";
import requests from "../../config/requests.config";
import AppModal from "../general/AppModal";
import FormRoleCreate from "../../forms/FormRoleCreate";

const CreateRoleButton: React.FC<{}> = ({}) => {
    return (
        <>
            <IonFabButton color={'primary'} size={'small'} id='open-modal-create-new-role-form'>
                <IonIcon icon={add}></IonIcon>
            </IonFabButton>

            <AppModal trigger='open-modal-create-new-role-form' title='Створити роль'>
                <FormRoleCreate requestLink={requests.post.roles.create} />
            </AppModal>
        </>
    )
}

export default CreateRoleButton;
import React from "react";
import {IonFabButton, IonIcon, IonToast} from "@ionic/react";
import {trash} from "ionicons/icons";

const DeleteRoleButton: React.FC<{
    deleteRoleVisual: () => void;
    deleteRole: (role: string) => void;
    deleteRoleDismiss: () => void;
}> = ({deleteRoleVisual, deleteRoleDismiss, deleteRole}) => {
    return (
        <>
            <IonFabButton color={'danger'} size={'small'} onClick={deleteRoleVisual} id='open-toast-deleted-role'>
                <IonIcon icon={trash}></IonIcon>
            </IonFabButton>
            <IonToast
                trigger="open-toast-deleted-role"
                message="Роль видалена"
                duration={3000}
                buttons={[
                    {
                        text: 'Відмінити',
                        role: 'cancel',
                        handler: () => deleteRoleDismiss(),
                    },
                ]}
                onDidDismiss={(e: CustomEvent) => deleteRole(e.detail.role)}
            ></IonToast>
        </>
    )
}

export default DeleteRoleButton;
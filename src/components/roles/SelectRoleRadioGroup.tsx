import React from "react";
import {IonItem, IonRadio, IonRadioGroup} from "@ionic/react";

const SelectRoleRadioGroup: React.FC<{
    selectedRoleId?: number;
    hasRelevantRole: boolean;
    lastRoleId: number;
    handleChanges: (ev: any) => void;
    roles: Array<RoleModel>;
}> = ({selectedRoleId, lastRoleId, roles, hasRelevantRole, handleChanges}) => {
    return (
        <>
            <IonRadioGroup value={selectedRoleId ?? (hasRelevantRole ? lastRoleId : null)} onIonChange={handleChanges}>
                {roles.map((role) => (
                    <IonItem key={role.id}>
                        <IonRadio value={role.id}>
                            {role.role}

                            {/* Displayed a list of parts of the selected role */}
                            <ul style={{ display: selectedRoleId === role.id ? "block" : "none" }}>
                                {
                                    role.parts?.map((part, index) => {
                                        return <li key={index}>{part}</li>
                                    })
                                }
                            </ul>
                        </IonRadio>
                    </IonItem>
                ))}
            </IonRadioGroup>
        </>
    )
}

export default SelectRoleRadioGroup;
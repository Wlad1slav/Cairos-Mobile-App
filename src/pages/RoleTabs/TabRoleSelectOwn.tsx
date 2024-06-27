import React, { useEffect, useState } from "react";
import { IonFab, IonList, IonPage } from "@ionic/react";

import AppHeader from "../../components/header/AppHeader";
import AppContent from "../../components/AppContent";
import SelectRoleButton from "../../components/roles/SelectRoleButton";
import DeleteRoleButton from "../../components/roles/DeleteRoleButton";
import CreateRoleButton from "../../components/roles/CreateRoleButton";
import SelectRoleRadioGroup from "../../components/roles/SelectRoleRadioGroup";
import RoleTabs from "../../components/roles/RoleTabs";

import requests from "../../config/requests.config";
import routes from "../../config/routes.config";

import {useRoles} from "../../hooks/useRoles";

const TabRoleSelectOwn: React.FC = () => {

    const {
        roles,
        selectedRoleId,
        selectRole,
        deleteRoleDismiss,
        deleteRoleVisual,
        hasRelevantRole,
        deleteRole,
        handleChanges,
        lastRole
    } = useRoles(requests.get.roles.my);

    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <RoleTabs />

                <h1 style={{ textAlign: "center" }}>Вибрати роль</h1>

                {
                    roles.length < 1 &&
                    <p style={{paddingInline: "20px"}}>
                        У вас поки що немає жодної ролі! Ви можете створити власну або <a href={routes.roleSelectGlobal.url}>вибрати одну з підтверженних, глобальних ролей</a>.
                    </p>
                }

                <IonList>
                    <SelectRoleRadioGroup
                        selectedRoleId={selectedRoleId}
                        hasRelevantRole={hasRelevantRole}
                        lastRoleId={lastRole?.roleId}
                        handleChanges={handleChanges}
                        roles={roles}
                    />
                </IonList>

                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    {selectedRoleId && (
                        <>
                            <DeleteRoleButton
                                deleteRoleVisual={deleteRoleVisual}
                                deleteRole={deleteRole}
                                deleteRoleDismiss={deleteRoleDismiss}
                            />

                            <SelectRoleButton selectRole={selectRole} />
                        </>
                    )}
                    <CreateRoleButton />
                </IonFab>
            </AppContent>
        </IonPage>
    );
}

export default TabRoleSelectOwn;

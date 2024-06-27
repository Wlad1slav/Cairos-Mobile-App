import React, { useEffect, useState } from "react";
import { IonFab, IonList, IonPage } from "@ionic/react";

import AppHeader from "../../components/header/AppHeader";
import AppContent from "../../components/AppContent";
import SelectRoleButton from "../../components/roles/SelectRoleButton";
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
        hasRelevantRole,
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
                        У вас поки що немає жодної ролі! Ви можете <a href="/">створити власну</a> або <a href={routes.roleSelectGlobal.url}>вибрати одну з підтверженних, глобальних ролей</a>.
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
                    {selectedRoleId && <SelectRoleButton selectRole={selectRole}/>}
                </IonFab>
            </AppContent>
        </IonPage>
    );
}

export default TabRoleSelectOwn;

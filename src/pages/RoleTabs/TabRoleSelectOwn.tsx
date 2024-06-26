import React, { useEffect, useState } from "react";
import {
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonToast
} from "@ionic/react";

import AppHeader from "../../components/header/AppHeader";
import AppContent from "../../components/AppContent";
import {add, checkmark, list, trash} from "ionicons/icons";
import AppTabs from "../../components/general/AppTabs";
import routes from "../../config/routes.config";
import { useStorage } from "../../hooks/useStorage";
import storageKeys from "../../config/storages.config";
import isDateThisWeek from "../../utils/datetime.isDateThisWeek";
import RequestAuthorized from "../../utils/request.authorized.class";
import requests from "../../config/requests.config";
import { isProfileData, UserModel } from "../../models/user.model";
import SelectRoleButton from "../../components/roles/SelectRoleButton";
import DeleteRoleButton from "../../components/roles/DeleteRoleButton";
import deleteRoleButton from "../../components/roles/DeleteRoleButton";
import CreateRoleButton from "../../components/roles/CreateRoleButton";
import SelectRoleRadioGroup from "../../components/roles/SelectRoleRadioGroup";
import RoleTabs from "../../components/roles/RoleTabs";

const TabRoleSelectOwn: React.FC = () => {
    // Obtaining a token for the request API
    const { rows: tokenRows } = useStorage<string>(storageKeys.token);
    const token = tokenRows[0]?.values;

    // Get the last selected role
    const { rows: roleRows, setNewRows } = useStorage<RoleStorage>(storageKeys.roleForWeek);
    const lastRole = roleRows[0]?.values;

    // The state preserves whether there is a relevant unexpired role
    const [hasRelevantRole, setHasRelevantRole] = useState<boolean>(false);

    // The state saves the ID of the selected role
    const [selectedRoleId, setSelectedRoleId] = useState<number>();

    // The state retains the last deleted role
    const [deletedRole, setDeletedRole] = useState<RoleModel>();

    // The state stores all user-created roles
    const [roles, setRoles] = useState<Array<RoleModel>>([]);

    // Check whether the role is relevant. Checks whether it has expired.
    useEffect(() => {
        const lastRoleDateSelected = new Date(lastRole?.date);
        setHasRelevantRole(roleRows && isDateThisWeek(lastRoleDateSelected));
    }, [roleRows]);

    // Get all user-created roles
    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get<RoleModel[]>(requests.get.roles.my);
            response.then((value) => {
                setRoles(value);
            });
        }
    }, [token]);

    const handleChanges = (ev: any) => {
        setSelectedRoleId(ev.detail.value);
    };

    // Function to store the role selection
    const selectRole = () => {
        if (selectedRoleId) {

            // The role selection is stored in local storage
            setNewRows([
                {
                    date: new Date().toISOString(),
                    roleId: selectedRoleId
                }
            ]);

            // The role selection is stored in server
            if (token) {
                const request = new RequestAuthorized(token);
                request.post(requests.post.roles.certain, {roleId: selectedRoleId});
            }
        }
    };

    // Role deleting visually
    const deleteRoleVisual = () => {
        setDeletedRole(roles.find(role => role.id === selectedRoleId));
        setRoles((prevRoles) => prevRoles.filter(role => role.id !== selectedRoleId));
    }

    // Role deleting in server
    const deleteRole = (role: string) => {
        // If user wasn't cancelled deletion
        if (role === 'timeout') {
            const request = new RequestAuthorized(token);
            request.delete(`${requests.delete.roles.role}?roleId=${selectedRoleId}`).then(value => {
                console.log(value);
            });
        }
    }

    // If user dismissed deletion role is returning
    const deleteRoleDismiss = () => {
        if (deletedRole) {
            setRoles([...roles, deletedRole]);
        }
    }

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

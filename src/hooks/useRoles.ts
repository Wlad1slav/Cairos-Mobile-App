import { useEffect, useState } from "react";
import { useStorage } from "./useStorage";
import storageKeys from "../config/storages.config";
import isDateThisWeek from "../utils/datetime.isDateThisWeek";
import RequestAuthorized from "../utils/request.authorized.class";
import requests from "../config/requests.config";


export const useRoles = (roleRequest: string) => {
    const { rows: tokenRows } = useStorage<string>(storageKeys.token);
    const token = tokenRows[0]?.values;

    const { rows: roleRows, setNewRows } = useStorage<RoleStorage>(storageKeys.roleForWeek);
    const lastRole = roleRows[0]?.values;

    const [hasRelevantRole, setHasRelevantRole] = useState<boolean>(false);
    const [selectedRoleId, setSelectedRoleId] = useState<number>();
    const [deletedRole, setDeletedRole] = useState<RoleModel>();
    const [roles, setRoles] = useState<Array<RoleModel>>([]);

    useEffect(() => {
        const lastRoleDateSelected = new Date(lastRole?.date);
        setHasRelevantRole(roleRows && isDateThisWeek(lastRoleDateSelected));
    }, [roleRows]);

    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get<RoleModel[]>(roleRequest);
            response.then((value) => {
                setRoles(value);
            });
        }
    }, [token]);

    const handleChanges = (ev: any) => {
        setSelectedRoleId(ev.detail.value);
    };

    const selectRole = () => {
        if (selectedRoleId) {
            setNewRows([
                {
                    date: new Date().toISOString(),
                    roleId: selectedRoleId,
                },
            ]);

            if (token) {
                const request = new RequestAuthorized(token);
                request.post(requests.post.roles.certain, { roleId: selectedRoleId });
            }
        }
    };

    const deleteRoleVisual = () => {
        setDeletedRole(roles.find((role) => role.id === selectedRoleId));
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedRoleId));
    };

    const deleteRole = (role: string) => {
        if (role === 'timeout' && token) {
            const request = new RequestAuthorized(token);
            request.delete(`${requests.delete.roles.role}?roleId=${selectedRoleId}`).then((value) => {
                console.log(value);
            });

            setNewRows([]);
        }
    };

    const deleteRoleDismiss = () => {
        if (deletedRole) {
            setRoles([...roles, deletedRole]);
        }
    };

    return {
        hasRelevantRole,
        selectedRoleId,
        roles,
        handleChanges,
        selectRole,
        deleteRoleVisual,
        deleteRole,
        deleteRoleDismiss,
        lastRole
    };
};

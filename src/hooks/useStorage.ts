import {Storage} from "@ionic/storage";
import {useEffect, useState} from "react";

import Item from "./item.interface";

const STORAGE_NAME = 'local-storage'

/**
 * Custom hook for managing local storage with Ionic Storage.
 *
 * @param storageKey - The key used to store and retrieve data in local storage.
 */
export function useStorage<T>(storageKey: string) {
    const [store, setStore] = useState<Storage>()
    const [rows, setRows] = useState<Item<T>[]>([])

    // Initialize the storage on component mount
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: STORAGE_NAME
            });
            const store = await newStore.create();
            setStore(store);

            // Retrieve stored data or initialize with an empty array
            const storedTools = await store.get(storageKey) || [];
            setRows(storedTools);
        }
        initStorage();
    }, []);

    /**
     * Adds a new row to the local storage.
     *
     * @param value - The value to be added to the storage.
     */
    const addRow = async (value: T) => {
        const newRow = {
            id: new Date().getTime().toString(),
            values: value
        }
        const updatedRows = [...rows, newRow];
        setRows(updatedRows);
        store?.set(storageKey, updatedRows);
    }

    /**
     * Updates an existing row in the local storage.
     *
     * @param id - The ID of the row to update.
     * @param newValue - The new values to update in the row.
     */
    const updateRow = async (id: string, newValue: Partial<T>) => {
        const toUpdate = [...rows];

        // Find the row that needs to be updated
        let row = rows.filter(row => row.id === id)[0];

        // Update the specific properties of the row's values
        row.values = { ...row.values, ...newValue };

        setRows(toUpdate);

        return store?.set(storageKey, rows);
    }

    /**
     * Sets new rows in the local storage, replacing any existing data.
     *
     * @param values - An array of values to be stored.
     */
    const setNewRows = async (values: Array<T>) => {

        const newRows: Item<T>[] = values.map((value) => {
            return {
                id: new Date().getTime().toString(),
                values: value
            }
        });

        setRows(newRows);

        return store?.set(storageKey, newRows);
    }

    return {
        rows: rows,
        addRow: addRow,
        updateRow: updateRow,
        setNewRows: setNewRows
    };
}

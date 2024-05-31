import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

const STORAGE_NAME = 'local-storage'

export interface Item<T> {
    id: string;
    values: T; // Uses the passed interface
}

export function useStorage<T>(storageKey: string) {
    const [store, setStore] = useState<Storage>()
    const [rows, setRows] = useState<Item<T>[]>([])

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: STORAGE_NAME
            });
            const store = await newStore.create();
            setStore(store);

            const storedTools = await store.get(storageKey) || [];
            setRows(storedTools);
        }
        initStorage();
    }, []);

    /* Create new row */
    const addRow = async (value: T) => {
        const newTodo = {
            id: new Date().getTime().toString(),
            values: value
        }
        const updatedTodos = [...rows, newTodo];
        setRows(updatedTodos);
        console.log(updatedTodos);
        store?.set(storageKey, updatedTodos);
    }

    /* Update existing row */
    const updateRow = async (id: string, newValue: Partial<T>) => {
        const toUpdate = [...rows];

        // Finds a row that changes in local storage
        let row = rows.filter(todo => todo.id === id)[0];

        // The specific rows of the object that were passed are updated.
        // Others do not change.
        row.values = { ...row.values, ...newValue };

        setRows(toUpdate);

        return store?.set(storageKey, rows);
    }

    return { rows: rows, addRow: addRow, updateRow: updateRow }
}

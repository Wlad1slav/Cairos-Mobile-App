import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = 'local-storage-key'

export interface Item<T> {
    id: string;
    values: T; // Uses the passed interface
}

export function useStorage<T>(storageName: string) {
    const [store, setStore] = useState<Storage>()
    const [rows, setRows] = useState<Item<T>[]>([])

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: storageName
            });
            const store = await newStore.create();
            setStore(store);

            const storedTools = await store.get(LOCAL_STORAGE_KEY) || [];
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
        store?.set(LOCAL_STORAGE_KEY, updatedTodos);
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

        return store?.set(LOCAL_STORAGE_KEY, rows);
    }

    return { todos: rows, addTodo: addRow, updateTodoStatus: updateRow }
}

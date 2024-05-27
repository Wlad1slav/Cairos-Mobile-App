import { Storage } from "@ionic/storage";
import {useEffect, useState} from "react";

const TODOS_KEY = 'todos-key'

export interface TodoItem {
    id: string
    title: string
    content: string
    image: string
    isDone: boolean
    date: number // day
}


export function useStorage() {

    const [store, setStore] = useState<Storage>()
    const [todos, setTodos] = useState<TodoItem[]>([])

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'cairosdb'

            });
            const store = await newStore.create();
            setStore(store);

            const storedTools = await store.get(TODOS_KEY) || [];
            setTodos(storedTools);
        }
        initStorage();
    }, []);

    /* Create new task */
    const addTodo = async (taskTitle: string, taskText: string, taskImage: string) => {
        const newTodo = {
            id: new Date().getTime().toString(),
            title: taskTitle,
            content: taskText,
            image: taskImage,
            isDone: false,
            date: new Date().getDate()
        }
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        console.log(updatedTodos);
        store?.set(TODOS_KEY, updatedTodos);
    }

    /* Change existing task's status */
    const updateTodoStatus = async (id: string, status: boolean) => {
        const toUpdate = [...todos];
        let todo = todos.filter(todo => todo.id === id)[0];
        todo.isDone = status;

        setTodos(toUpdate);
        return store?.set(TODOS_KEY, todos);
    }

    return {
        todos,
        addTodo,
        updateTodoStatus
    }
}
import {
    IonButton, IonContent, IonIcon,
    IonItem, IonItemOption, IonItemOptions,
    IonItemSliding, IonList, IonPage
} from '@ionic/react';

import React, {useRef} from "react";

import {checkmark, returnDownBack} from "ionicons/icons";

import AppHeader from "../components/AppHeader";
import AppTodo from "../components/AppTodo";
import {TodoValues} from "../components/AppTodo";

import {useStorage} from "../../hooks/useStorage";


const TabTodos: React.FC = () => {

    const {todos, addTodo, updateTodoStatus} = useStorage<TodoValues>('cairosdb');

    const ionList = useRef(null as any);

    const createTodo = async () => {
        await addTodo({
            title: 'Попий води',
            content: 'Вода є життєво необхідною для здоров\'я. Вона підтримує функціонування організму, покращує обмін речовин та підтримує баланс рідин ️.',
            image: 'https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg',
            isDone: false
        });
    }

    const updateStatus = async (id: string, newStatus: boolean) => {
        await ionList.current.closeSlidingItems();
        await updateTodoStatus(id, {
            isDone: newStatus
        });
    }

    return (
        <IonPage>

            <AppHeader/>

            <IonContent fullscreen>

                <IonButton onClick={() => createTodo()}>Add</IonButton>

                <IonList ref={ionList}>
                    {/* A cycle that goes through all the tasks for the day and outputs them */}
                    {todos.map((todo, key) => (
                        <IonItemSliding key={key}>
                            <IonItem>
                                <AppTodo title={todo.values.title}
                                             image={todo.values.image}
                                             isDone={todo.values.isDone}>
                                    {todo.values.content}
                                </AppTodo>
                            </IonItem>

                            {/* If the task has not yet been completed, an option to complete it is available */}
                            {!todo.values.isDone ?
                                <IonItemOptions side="start">
                                    <IonItemOption color={'tertiary'} onClick={() => updateStatus(todo.id, true)} >
                                        <IonIcon icon={checkmark}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                :
                                <IonItemOptions side="end">
                                    <IonItemOption color={'primary'} onClick={() => updateStatus(todo.id, false)} >
                                        <IonIcon icon={returnDownBack}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            }

                        </IonItemSliding>
                    ))}

                </IonList>

            </IonContent>

        </IonPage>
    );
};

export default TabTodos;

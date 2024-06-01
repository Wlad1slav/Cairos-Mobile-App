import {
    IonIcon, IonItemOptions,
    IonItem, IonItemOption,
    IonItemSliding, IonList, IonPage
} from '@ionic/react';

import React, {useRef} from "react";

import {checkmark, returnDownBack} from "ionicons/icons";

import AppHeader from "../components/AppHeader";
import AppTodo from "../components/AppTodo";
import AppContent from "../components/AppContent";

import {TodoItem} from "../components/AppTodo";
import {useStorage} from "../hooks/useStorage";

import storageKeys from "../config/storages.config";


const TabTodos: React.FC = () => {

    const {rows, addRow, updateRow} = useStorage<TodoItem>(storageKeys.todos);

    const ionList = useRef(null as any);

    const createTodo = async () => {
        await addRow({
            title: 'Попий води',
            content: 'Вода є життєво необхідною для здоров\'я. Вона підтримує функціонування організму, покращує обмін речовин та підтримує баланс рідин ️.',
            image: 'https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg',
            isDone: false
        });
    }

    const updateStatus = async (id: string, newStatus: boolean) => {
        await ionList.current.closeSlidingItems();
        await updateRow(id, {
            isDone: newStatus
        });
    }

    return (
        <IonPage>

            <AppHeader/>

            <AppContent>

                {/*<IonButton onClick={() => createTodo()}>Add</IonButton>*/}

                <IonList ref={ionList}>
                    {/* A cycle that goes through all the tasks for the day and outputs them */}
                    {rows.map((todo, key) => (
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

            </AppContent>

        </IonPage>
    );
};

export default TabTodos;

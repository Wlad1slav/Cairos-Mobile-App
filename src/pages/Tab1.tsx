import {
    IonButton, IonContent, IonIcon,
    IonItem, IonItemOption, IonItemOptions,
    IonItemSliding, IonList, IonPage
} from '@ionic/react';

import React, {useRef} from "react";

import {checkmark, returnDownBack} from "ionicons/icons";

import AppReminder from "../components/AppReminder";
import AppHeader from "../components/AppHeader";

import {useStorage} from "../../hooks/useStorage";


const Tab1: React.FC = () => {

    const {todos, addTodo, updateTodoStatus} = useStorage();
    const ionList = useRef(null as any);

    const createTodo = async () => {
        await addTodo(
            'Попий води',
            'Вода є життєво необхідною для здоров\'я. Вона підтримує функціонування організму, покращує обмін речовин та підтримує баланс рідин ️.',
            'https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg'
        );
    }

    const updateStatus = async (id: string, newStatus: boolean) => {
        await ionList.current.closeSlidingItems();
        await updateTodoStatus(id, newStatus);
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
                                <AppReminder heading={todo.title}
                                             imagePath={todo.image}
                                             isDone={todo.isDone}>
                                    {todo.content}
                                </AppReminder>
                            </IonItem>

                            {/* If the task has not yet been completed, an option to complete it is available */}
                            {!todo.isDone ?
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

export default Tab1;

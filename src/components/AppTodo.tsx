import {IonText} from "@ionic/react";
import {ReactNode} from "react";

import './AppTodo.scss';
import '../stylesheet/container.scss';


export interface TodoValues {
    title: string
    content: string
    image: string
    isDone: boolean
}

interface Todo extends Omit<TodoValues, 'content'> {
    children: ReactNode
}

function AppTodo({title, image, isDone, children}: Todo) {
    return (
        <div className={['reminder', isDone ? 'done' : ''].join(' ')}>
            <img src={image} alt={image}/>
            <div className="content">
                <IonText color="primary">
                    <h3>{title}</h3>
                </IonText>
                <IonText color='dark'>
                    <p>{children}</p>
                </IonText>
            </div>
        </div>
    );
}

export default AppTodo;
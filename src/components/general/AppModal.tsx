import React, {useEffect, useRef, useState} from "react";
import {IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/react";
import AppInput from "./AppInput";

const AppModal: React.FC<Readonly<{
    trigger: string,
    title: string,
    children: React.ReactNode
}>> = ({trigger, title, children}) => {

    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);

    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal ref={modal} trigger={trigger} presentingElement={presentingElement!}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => dismiss()}>Закрити</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {children}
            </IonContent>
        </IonModal>
    );
}

export default AppModal;
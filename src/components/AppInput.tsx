import { IonIcon, IonInput } from "@ionic/react";
import React, { useState } from "react";
import {TextFieldTypes} from "@ionic/core";

interface AppInput {
    type: TextFieldTypes;
    label: string;
    labelPlacement?: "floating" | "stacked" | "fixed";
    fill?: 'outline' | 'solid';
    helperText?: string;
    errorText?: string;
    placeholder?: string;
    icon?: string;
    validateFunction?: (value: string) => RegExpMatchArray | boolean | null;
    maxlength?: number;
    minlength?: number;
    counter?: boolean;
}

const AppInput: React.FC<AppInput> = ({
                                           type,
                                           label,
                                           labelPlacement = "floating",
                                           fill = "solid",
                                           helperText,
                                           errorText,
                                           placeholder,
                                           icon,
                                           validateFunction = () => { return true; },
                                           maxlength = 254,
                                           minlength ,
                                           counter = false
                                       }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

        validateFunction(value) ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    return (
        <IonInput
            type={type}
            label={label}
            labelPlacement={labelPlacement}
            fill={fill}
            helperText={helperText}
            errorText={errorText}
            placeholder={placeholder}
            maxlength={maxlength}
            minlength={minlength}
            className={`${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            counter={counter}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} символів залишилося`}
        >
            {/* If an icon is used for the field */}
            { icon ?
                <IonIcon slot="start" icon={icon} aria-hidden="true" color={(isValid ?? true) ? 'primary' : 'danger'}></IonIcon>
                : ''
            }
        </IonInput>
    );
};

export default AppInput;

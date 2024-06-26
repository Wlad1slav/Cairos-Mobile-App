export const validateEmail = (email: string) => {
    return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
};

export const validatePassword = (password: string) => {
    const passwordLengthMinimum = 8;
    return password.length >= passwordLengthMinimum;
};

export const validatePasswordRepeat = (repeat: string) => {
    const passwordElement = document.getElementsByName('password')[0] as HTMLInputElement;
    return passwordElement.value === repeat;
}

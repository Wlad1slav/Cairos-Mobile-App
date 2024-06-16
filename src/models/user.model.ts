export interface UserModel {
    email: string;
    name: string | null;
    birthday_date: string | null;
    sex: 'male' | 'female' | 'other' | 'dont-specify';
}

export function isProfileData<T>(value: any): value is T {
    return (value && typeof value.email === 'string' && (typeof value.name === 'string' || value.name === null));
}
interface UserModel {
    email: string;
    name: string | null;
    birthday_date: string | null;
    sex: 'male' | 'female' | 'other' | 'dont-specify';
}

export function isProfileData<T>(value: any): value is T {
    return (value && typeof value.email === 'string' && (typeof value.name === 'string' || value.name === null));
}
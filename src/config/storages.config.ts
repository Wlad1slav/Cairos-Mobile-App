interface StorageKeysConfig {
    [key: string]: string;
}

const storageKeys: StorageKeysConfig = {
    token: 'token',
    todos: 'tips_for_today',
    concentrationLevel: 'concentration_level',
    actions: 'actions'
}

export default storageKeys;
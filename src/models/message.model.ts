export interface MessageModel {
    user_id: number;
    text: string;
    created_at: string;
}

/**
 * Check if the value is a message
 *
 * @param value
 */
export function isMessageData(value: any): value is MessageModel {
    return (
        typeof value.user_id === 'number' &&
        typeof value.text === 'string' &&
        typeof value.created_at === 'string'
    );
}

/**
 * Check if the value is an array of messages
 *
 * @param value
 */
export function isMessagesArrayData(value: any): value is MessageModel[] {
    return Array.isArray(value) && value.every(
        (item) => isMessageData(item)
    );
}
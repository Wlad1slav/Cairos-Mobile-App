/**
 * A single value data type in storage
 */
interface Item<T> {
    id: string;
    values: T;
}

export default Item;
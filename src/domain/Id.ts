export abstract class GenericId<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    public equals(other: GenericId<T>): boolean {
        return this.value == other.value;
    }
}

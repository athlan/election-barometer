export abstract class GenericId<T> {
    readonly value: T;

    protected constructor(value: T) {
        this.value = value;
    }

    public equals(other: GenericId<T>): boolean {
        return other && this.value == other.value;
    }
}

export default class Des {
    private _sides: number;
    private _value: number = 0;

    public constructor(sides?: number) {
        this._sides = sides || 6;
    }


    lanceDes(): number {
        this._value = Math.floor(Math.random() * this._sides) + 1;
        return this._value;
    }

    get value() {
        return this._value;
    }

    set sides(number: number) {
        this._sides = number;
    }
}
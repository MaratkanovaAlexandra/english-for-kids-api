import CardEnum from "../models/card-enum";

export function findCard (name: string): {
    name: string;
    transl: string;
    img: string;
    sound: string;
}|{
    name: string;
    transl: null;
    img: string;
    sound: null;
}{
    for (const key in CardEnum) {
        for (let i = 0; i < CardEnum[key].length; i += 1) {
            if (CardEnum[key][i].name === name) {
                return CardEnum[key][i];
            }
        }
    }
    return {name: "", transl: null, img: "", sound: null}
}
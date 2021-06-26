import CardEnum from "../models/card-enum";
import * as Const from "../models/const";

export async function createLocalStorage() {
    for (const key in CardEnum) {
        if (key !== Const.MAIN_PAGE)
        CardEnum[key].forEach((card) => {
            if (localStorage[`${card}`] === undefined) {
                localStorage.setItem(card.name, JSON.stringify({trainClick: 0, correctClick: 0, wrongClick: 0}));
            }
        })
    }
}

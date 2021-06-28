import CardEnum from "../models/card-enum";

function findCard(name: string): {
    name: string;
    transl: string;
    img: string;
    sound: string;
}|{
    name: string;
    transl: null;
    img: string;
    sound: null;
} {
  Object.keys(CardEnum).forEach((key) => {
    for (let i = 0; i < CardEnum[key].length; i += 1) {
      if (CardEnum[key][i].name === name) {
        return CardEnum[key][i];
      }
    }
    return {
      name: "",
      transl: null,
      img: "",
      sound: null,
    };
  });
  return {
    name: "",
    transl: null,
    img: "",
    sound: null,
  };
}

export default findCard;

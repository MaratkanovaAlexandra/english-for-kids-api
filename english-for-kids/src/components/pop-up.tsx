import React, { PureComponent } from "react";
import * as Const from "../models/const";

export interface PopUpProps {}

export interface PopUpState {}

class PopUp extends PureComponent<PopUpProps, PopUpState> {
  render() {
    return (
      <div className="pop-up__back">
        <div className="pop-up__main">
          <header className="pop-up__head">{Const.LOGIN}</header>
          <form action="input" className="pop-up__form">
            <input type="text" className="pop-up__input" placeholder={Const.LOGIN} />
            <input type="text" className="pop-up__input" placeholder={Const.PASSWORD} />
          </form>
          <footer className="pop-up__footer">
            <button type="button" className="pop-up__button cansel">{Const.CANSEL}</button>
            <button type="button" className="pop-up__button login">{Const.LOGIN}</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default PopUp;

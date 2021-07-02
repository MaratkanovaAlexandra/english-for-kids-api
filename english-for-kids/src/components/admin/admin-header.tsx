import React, { PureComponent } from "react";
import * as Const from "../../models/const";

export interface AdmHeaderProps {}

export interface AdmHeaderState {}

class AdmHeader extends PureComponent<AdmHeaderProps, AdmHeaderState> {
  render() {
    return (
      <header className="admHeader__back">
        <div className="admHeader__items">
          <button type="button" className="admHeader__button">{Const.CATEGOR}</button>
          <button type="button" className="admHeader__button">{Const.WORDS}</button>
          <button type="button" className="admHeader__logout">{Const.LODOUT}</button>
        </div>
      </header>
    );
  }
}

export default AdmHeader;

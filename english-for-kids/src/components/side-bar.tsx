import React, { PureComponent } from 'react';
import * as Const from '../models/const';

export interface SideBarProps {
    
}
 
export interface SideBarState {
    
}
 
class SideBar extends React.Component<SideBarProps, SideBarState> {
    state = { }
    render() { 
        return ( 
        <div className = {"sideBar"}>
            <ul  className = {"sideBar__items"}>
                <li className = {"sideBar__item"}>{Const.MAIN_PAGE}</li>
                <li className = {"sideBar__item"}>{Const.ACTION_A}</li>
                <li className = {"sideBar__item"}>{Const.ACTION_B}</li>
                <li className = {"sideBar__item"}>{Const.ACTION_C}</li>
                <li className = {"sideBar__item"}>{Const.ADJECTIVE}</li>
                <li className = {"sideBar__item"}>{Const.ANIMAL_A}</li>
                <li className = {"sideBar__item"}>{Const.ANIMAL_B}</li>
                <li className = {"sideBar__item"}>{Const.CLOTHES}</li>
                <li className = {"sideBar__item"}>{Const.EMOTION}</li>
            </ul>
            <button className = {"login_button"}>{Const.LOGIN}</button>
        </div>
        );
    }
}
 
export default SideBar;
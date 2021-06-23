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
                <li>{Const.MAIN_PAGE}</li>
                <li>{Const.ACTION_A}</li>
                <li>{Const.ACTION_B}</li>
                <li>{Const.ACTION_C}</li>
                <li>{Const.ADJECTIVE}</li>
                <li>{Const.ANIMAL_A}</li>
                <li>{Const.ANIMAL_B}</li>
                <li>{Const.CLOTHES}</li>
                <li>{Const.EMOTION}</li>
            </ul>
            <button>{Const.LOGIN}</button>
        </div>
        );
    }
}
 
export default SideBar;
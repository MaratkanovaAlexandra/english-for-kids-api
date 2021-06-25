import { MouseEventHandler, PureComponent } from 'react';
import * as Const from '../models/const';
import Redux from './../models/redux';


export interface SideBarProps {
    funstions: Function[],
}
 
export interface SideBarState {}
 
class SideBar extends PureComponent<SideBarProps, SideBarState> {
    render() { 
        return ( 
        <div className = {this.getState() + this.getPlayMode()}>
            <div className = {"sideBar__cross"} onClick = {this.props.funstions[1] as MouseEventHandler} ></div>
            <ul className = {"sideBar__items"} onClick = {this.props.funstions[0] as MouseEventHandler}>
                <li className = {this.getItemStyle(Const.MAIN_PAGE)}>{Const.MAIN_PAGE}</li>
                <li className = {this.getItemStyle(Const.ACTION_A)}>{Const.ACTION_A}</li>
                <li className = {this.getItemStyle(Const.ACTION_B)}>{Const.ACTION_B}</li>
                <li className = {this.getItemStyle(Const.ACTION_C)}>{Const.ACTION_C}</li>
                <li className = {this.getItemStyle(Const.ADJECTIVE)}>{Const.ADJECTIVE}</li>
                <li className = {this.getItemStyle(Const.ANIMAL_A)}>{Const.ANIMAL_A}</li>
                <li className = {this.getItemStyle(Const.ANIMAL_B)}>{Const.ANIMAL_B}</li>
                <li className = {this.getItemStyle(Const.CLOTHES)}>{Const.CLOTHES}</li>
                <li className = {this.getItemStyle(Const.EMOTION)}>{Const.EMOTION}</li>
            </ul>
            <button className = {"login_button"}>{Const.LOGIN}</button>
        </div>
        );
    }

    private getState = () => {
        let styles = "sideBar "; 
        return Redux.state.menuMode? styles + "open" : styles + "closed";
    }

    private getPlayMode = () => {
        return Redux.state.playMode? " play" : " train";
    } 

    private getItemStyle = (name: string) => {
        const styles = "sideBar__item";
        return name === Redux.state.page? styles + " choosen" : styles;
    }
}
 
export default SideBar;
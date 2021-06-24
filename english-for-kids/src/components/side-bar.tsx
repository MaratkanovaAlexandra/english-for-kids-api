import React, { MouseEventHandler, PureComponent } from 'react';
import * as Const from '../models/const';

export interface SideBarProps {
    playMode: boolean,
    menuMode : boolean,
    clickEvent: Function,
    page: string
}
 
export interface SideBarState {}
 
class SideBar extends PureComponent<SideBarProps, SideBarState> {
    render() { 
        return ( 
        <div className = {this.getState() + this.getPlayMode()}>
            <div className = {"sideBar__cross"}></div>
            <ul className = {"sideBar__items"} onClick = {this.props.clickEvent as MouseEventHandler}>
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
        return this.props.menuMode? styles + "open" : styles + "closed";
    }

    private getPlayMode = () => {
        return this.props.playMode? " play" : " train";
    } 

    private getItemStyle = (name: string) => {
        const styles = "sideBar__item";
        return name === this.props.page? styles + " choosen" : styles;
    }
}
 
export default SideBar;
import { MouseEventHandler, PureComponent } from "react";
import Redux from "./../models/redux";

export interface HeaderProps {
    functions: { play: Function, menu: Function}
}
 
export interface HeaderState {}
 
class Header extends PureComponent <Readonly<HeaderProps>, HeaderState> {
    render() { 
        return (  
            <header className = "header">
                <div className = {this.getHamburger()} onClick = {this.props.functions.menu as MouseEventHandler} ></div>
                <div className = {this.getMode()} onClick = {this.props.functions.play as MouseEventHandler}></div>
            </header>
        );
    }

    private getHamburger() {
        let styles = "header__hamburger-";
        return Redux.state.menuMode? styles + "open" : styles + "closed"; 
    }

    private getMode() {
        let styles = "header__mode-";
        return Redux.state.playMode? styles + "play" : styles + "train";
    }
}
 
export default Header;
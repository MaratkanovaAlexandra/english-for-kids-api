import React, { MouseEventHandler, PureComponent } from 'react';

export interface HeaderProps {
    playMode?: boolean;
    menuMode?: boolean;
    functions: { play: Function, menu: Function}
}
 
export interface HeaderState {}
 
class Header extends PureComponent <Readonly<HeaderProps>, HeaderState> {
    render() { 
        return (  
            <header className = 'header'>
                <div className = {this.getHamburger()} onClick = {this.props.functions.menu as MouseEventHandler} ></div>
                <div className = {this.getMode()} onClick = {this.props.functions.play as MouseEventHandler}></div>
            </header>
        );
    }

    private getHamburger() {
        let styles = 'header__hamburger-';
        return this.props.menuMode? styles + 'open' : styles + 'closed'; 
    }

    private getMode() {
        let styles = 'header__mode-';
        return this.props.playMode? styles + 'play' : styles + 'train';
    }
}
 
export default Header;
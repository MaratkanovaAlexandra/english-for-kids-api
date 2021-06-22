import React, { PureComponent } from 'react';

export interface HeaderProps {
    playMode?: boolean;
    menuMode?: boolean;
}
 
export interface HeaderState {
    playMode?: boolean;
    menuMode?: boolean;
}
 
class Header extends React.Component <Readonly<HeaderProps>, HeaderState> {
    state = {
       
    }
    
    render() { 
        return (  
            <header className = 'header'>
                <div className = {this.getHamburger()}></div>
                <div className = {this.getMode()}></div>
            </header>
        );
    }

    private getHamburger() {
        let styles = 'header__hamburger-';
        return this.props.menuMode? styles + 'open' : styles + 'closed' 
    }

    private getMode() {
        let styles = 'header__mode-';
        return this.props.playMode? styles + 'play' : styles + 'train';
    }
}
 
export default Header;
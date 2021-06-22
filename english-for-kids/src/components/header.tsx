import React, { PureComponent } from 'react';

export interface HeaderProps {
    playMode?: boolean;
    menuMode?: boolean;
}
 
export interface HeaderState {
    playMode: boolean;
    menuMode: boolean;
}
 
class Header extends React.Component <Readonly<HeaderProps>, HeaderState> {
    state = {
        playMode: this.props.playMode === undefined? false : true,
        menuMode: this.props.menuMode === undefined? false : true
    }
    
    render() { 
        console.log(this.state.playMode);
        return (  
            <header className = 'header'>
                <div className = {this.getHamburger()}></div>
                <div className = {this.getMode()}></div>
            </header>
        );
    }

    private getHamburger() {
        let styles = 'hamburger ';
        return this.state.menuMode? styles + 'onen' : styles + 'closed' 
    }

    private getMode() {
        let styles = 'mode ';
        return this.state.playMode? styles + 'play' : styles + 'train';
    }
}
 
export default Header;
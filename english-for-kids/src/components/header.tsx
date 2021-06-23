import React, { PureComponent } from 'react';

export interface HeaderProps {
    playMode?: boolean;
    menuMode?: boolean;
}
 
export interface HeaderState {
    playMode: boolean;
    menuMode?: boolean;
}
 
class Header extends React.Component <Readonly<HeaderProps>, HeaderState> {
    state = {
        playMode: this.props.playMode === undefined? false : this.props.playMode,  
        menuMode: this.props.menuMode === undefined? false : this.props.menuMode,  
    }
    
    render() { 
        return (  
            <header className = 'header'>
                <div className = {this.getHamburger()} onClick = {this.hambergerClick}></div>
                <div className = {this.getMode()} onClick = {this.modeClick}></div>
            </header>
        );
    }

    private getHamburger() {
        let styles = 'header__hamburger-';
        return this.state.menuMode? styles + 'open' : styles + 'closed'; 
    }

    private getMode() {
        let styles = 'header__mode-';
        return this.state.playMode? styles + 'play' : styles + 'train';
    }

    private hambergerClick = () => {
        this.setState({
            menuMode: !this.state.menuMode
        });
    }

    private modeClick = () => {
        this.setState({
            playMode: !this.state.playMode
        });
    }
}
 
export default Header;
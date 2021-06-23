import React, { PureComponent } from 'react';
import Header from './header';
import SideBar from './side-bar';

export interface AppProps {
    
}
 
export interface AppState {
    
}
 
class App extends React.Component<AppProps, AppState> {
    state = {}
    render() { 
        return (
            <React.Fragment>
            <div className = {"wrapper"}>
                <SideBar />
                <div className = {"mainApp"}>
                    <Header />
                </div>
            </div>
            </React.Fragment>
        );
    }
}
 
export default App;
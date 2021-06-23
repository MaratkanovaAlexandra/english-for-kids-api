import React, { PureComponent } from 'react';
import Header from './header';

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
                <Header />
                
            </div>
            </React.Fragment>
        );
    }
}
 
export default App;
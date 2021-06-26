import React, { PureComponent } from 'react';
import CardEnum from '../models/card-enum';
import * as Const from "../models/const"

export interface ScopeProps {
    
}
 
export interface ScopeState {
    
}
 
class Scope extends PureComponent<ScopeProps, ScopeState> {
    render() { 
        return ( 
            <React.Fragment>
                <div >
                    {CardEnum[Const.MAIN_PAGE].map((element) => this.getCategories(element.name))}
                </div>
            </React.Fragment>
        );
    }

    private getCategories = (name: string) => {
        const CATEGORY = CardEnum[name];
        return (
            <div key = {name} className = {"categories"}>
                <h2 className = {"categories__title"}>{name}</h2>
                {/* className = {"categories__item"} */}
                <div className = {"tableTop"}>
                    <p className = {"tableTop__item"}>{"word"}</p>
                    <p className = {"tableTop__item"}>{"translation"}</p>
                    <p className = {"tableTop__item"}>{"train clicks"}</p>
                    <p className = {"tableTop__item"}>{"correct answers"}</p>
                    <p className = {"tableTop__item"}>{"wrong answers"}</p>
                    <p className = {"tableTop__item"}>{"correct answers percent"}</p>
                </div>
                {CATEGORY.map(word => <div  key = {word.name} className = {"categories__item"}>
                                        <p  className = {"categories__word"}>{word.name}</p>
                                        <p  className = {"categories__word"}>{word.transl}</p>
                                        <p  className = {"categories__word"}>{JSON.parse(localStorage[`${word.name}`]).trainClick}</p>
                                        <p  className = {"categories__word"}>{JSON.parse(localStorage[`${word.name}`]).correctClick}</p>
                                        <p  className = {"categories__word"}>{JSON.parse(localStorage[`${word.name}`]).wrongClick}</p>
                                        <p  className = {"categories__word"}>{this.getPercent(word.name)}</p>
                                    </div>)}
            </div>
        )
    }

    private getPercent = (name:string) => {
        const STATS = JSON.parse(localStorage[`${name}`]);
        const ALL_ANSWERS = STATS.correctClick + STATS.wrongClick;
        if (ALL_ANSWERS === 0) return "0%";
        const RESULT = (STATS.correctClick/ALL_ANSWERS)*100;
        return RESULT%100 === 0? `${RESULT}%` : `${RESULT.toFixed(2)}%`;
    }
}
 
export default Scope;
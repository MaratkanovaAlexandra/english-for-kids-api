import React, { PureComponent } from "react";
import PlayCard from "../../types/card";

export interface CategoryProps {
    
}
 
export interface CategoryState {
    
}
 
class Category extends PureComponent<CategoryProps, CategoryState> {
  render() { 
    return (
      <div className="category-card">
        <button className="category-card__cross"></button>
        <div className="category-card__title">Action (set A)</div>
        <div className="category-card__words">words: 7</div>
        <div className="category-card__buttons">
          <button className="category-card__button">Update</button>
          <button className="category-card__button">Add word</button>
        </div>
      </div>
    );
  }
}
 
export default Category;
import React, { PureComponent } from "react";
import Category from "./category";
import Page from "../../types/page";

export interface CategoriesProps {}
 
export interface CategoriesState {}
 
class Categories extends PureComponent<CategoriesProps, CategoriesState> {
  state = {
    pages: [] as Page[]
  }

  componentDidMount = () => {
  }

  render() {
      return (
        <div className="categories-wrapper">
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      );
  }
}
 
export default Categories;
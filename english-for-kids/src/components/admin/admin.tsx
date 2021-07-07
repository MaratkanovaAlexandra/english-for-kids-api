import React, { PureComponent } from "react";
import AdmHeader from "./admin-header";
import Categories from "./categories";

export interface AdminProps {}
 
export interface AdminState {}
 
class Admin extends PureComponent<AdminProps, AdminState> {
  render() { 
    return (
       <>
         <AdmHeader />
         <Categories />
       </> 
    );
  }
}
 
export default Admin;
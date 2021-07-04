import { MAIN_SERVER } from "../models/url";
import Page from "../types/page";

export const getPages = async():Promise<Page> => {
  const req = await fetch(`${MAIN_SERVER}/pages`);
  const res = await req.json();

  return res;
}
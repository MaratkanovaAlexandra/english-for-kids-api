import { MAIN_SERVER } from "../models/url";
import Page from "../types/page";
import PlayCard from "../types/card";

export const getPages = async():Promise<Page[]> => {
  const req = await fetch(`${MAIN_SERVER}/pages`);
  const res = await req.json();

  return res;
}

export const getPageByName = async(page: string):Promise<Page> => {
    const req = await fetch(`${MAIN_SERVER}/pages?page=${page}`);
    const res = await req.json();

    return res;
}

export const getCards = async (category:string):Promise<PlayCard[]> => {
  const req = await fetch(`${MAIN_SERVER}${category}`);
  const res = await req.json();

  return res;
}

export const getAllCards = async():Promise<PlayCard[]> => {
  const req = await fetch(`${MAIN_SERVER}`);
  const res = await req.json();

  return res;
}
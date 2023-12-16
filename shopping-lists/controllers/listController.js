import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const viewMainPage = async (request) => {
  const numberOfLists = await listService.countLists() || 0; 
  const numberOfItems = await itemService.countItems() || 0;

  const data = {
    numberOfLists,
    numberOfItems,
    hasLists: numberOfLists > 0,
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await listService.create(name);

  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
  
  const url = new URL(request.url);
  const listId = url.pathname.split('/')[2];
  const one = await listService.findOne(listId)
  const data = {
    list: one,
    items: await itemService.findItemsByListId(listId),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const addListItem = async (request) => {
  const url = new URL(request.url);
  const listId = url.pathname.split('/')[2];
  const formData = await request.formData();
  const name = formData.get("name");

  await itemService.createItem(listId, name);

  return redirectTo(`/lists/${listId}`);
};

const collectItem = async (request) => {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const listId = segments[2];
  const itemId = segments[4];

  await itemService.markAsCollected(itemId);

  return redirectTo(`/lists/${listId}`);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const listId = url.pathname.split('/')[2];

  await listService.deactivate(listId);

  return redirectTo('/lists');
};

export { addList, viewLists, viewList, addListItem, collectItem, deactivateList, viewMainPage };
import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewMainPage(request);
  } 
  else if (url.pathname.endsWith("/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  }
  else if (url.pathname.endsWith("/collect") && request.method === "POST") {
    return await listController.collectItem(request);
  }
  else if (url.pathname.startsWith("/lists/") && request.method === "GET") {
    return await listController.viewList(request);
  } 
  else if (url.pathname.endsWith("/items") && request.method === "POST") {
    return await listController.addListItem(request);
  }
  else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } 
  else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } 
  else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
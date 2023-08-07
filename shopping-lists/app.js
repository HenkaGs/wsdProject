import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return new Response(`Redirecting to /lists.`, {
      status: 303,
      headers: {
        "Location": "/lists",
      },
    });
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
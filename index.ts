import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";
import { populateWorkersKv } from './populate';

const DEMOFLAG = "-demo"
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 1 -  //////////////////////////////////////////////////////
// Check needed environment variables are set up
const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")
export const testConfig = accountId + zoneId + domain + DEMOFLAG
///////////////////////////////////////////////////////////////////
// RUN pulumi up -y


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 2 -  //////////////////////////////////////////////////////
// A Key Value Namespace
// const namespace = new cloudflare.WorkersKvNamespace("elarroyo"+DEMOFLAG, {
//     accountId: accountId,
//     title: "elarroyo"+DEMOFLAG,
//   });
// // A sample entry to the Key Value Namespace
// const kv = new cloudflare.WorkersKv("test", {
//   accountId: accountId,
//   namespaceId: namespace.id,
//   key: "test",
//   value: "test test test 123",
// });
///////////////////////////////////////////////////////////////////
// RUN pulumi up -y
// [Optional] OPEN https://dash.cloudflare.com/24725f46259aa3c2a1d7810649cd7428/workers/kv/namespaces 


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 3 -  //////////////////////////////////////////////////////
// Populate the Key Value Namespace with El Arroyo submissions
// populateWorkersKv(namespace.id, accountId)
///////////////////////////////////////////////////////////////////
// RUN npm install fs   
// RUN npm install csv-parser 
// RUN pulumi up -y
// [Optional] OPEN https://dash.cloudflare.com/24725f46259aa3c2a1d7810649cd7428/workers/kv/namespaces 


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 4 -  //////////////////////////////////////////////////////
// A Worker script to invoke with access to the Key Value Namespace
// const script = new cloudflare.WorkerScript("elarroyo"+DEMOFLAG, {
//     accountId: accountId,
//     name: "elarroyo"+DEMOFLAG,
//     // Read the content of the worker from a file
//     content: fs.readFileSync("./app/worker.ts", "utf8"),
//     kvNamespaceBindings: [{
//       name: "KV_NAMESPACE_BINDING", /// <- super duper important!!!
//       namespaceId: namespace.id,
//     }],
//   });
///////////////////////////////////////////////////////////////////
// EDIT app/worker.ts to use a random KV entry
// RUN pulumi up -y
// [Optional] OPEN https://dash.cloudflare.com/24725f46259aa3c2a1d7810649cd7428/workers-and-pages
// Note, no route...yet!
  

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 5 -  //////////////////////////////////////////////////////
// A Worker route to serve requests and the Worker script
// const route = new cloudflare.WorkerRoute("elarroyo"+DEMOFLAG, {
//     zoneId: zoneId,
//     pattern: "elarroyo"+DEMOFLAG+"." + domain,
//     scriptName: script.name,
// });
// An Output displaying the url for the app
// export const url = route.pattern
///////////////////////////////////////////////////////////////////
// RUN pulumi up -y
// [Optional] OPEN https://dash.cloudflare.com/24725f46259aa3c2a1d7810649cd7428/workers-and-pages
// Note, no dns record...yet!

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 6 -  //////////////////////////////////////////////////////
// A DNS record to access the route from the domain
// const record = new cloudflare.Record("elarroyo"+DEMOFLAG, {
//     zoneId: zoneId,
//     name: "elarroyo"+DEMOFLAG,
//     value: "192.0.2.1",
//     type: "A",
//     proxied: true
// });
///////////////////////////////////////////////////////////////////
// RUN pulumi up -y
// [Optional] OPEN https://dash.cloudflare.com/24725f46259aa3c2a1d7810649cd7428/atxyall.com/dns/records



///////////////////////   END OF DEMO    /////////////////////////



///////////////////////    DANGER ZONE    /////////////////////////
///////////////////////    DANGER ZONE    /////////////////////////
///////////////////////    DANGER ZONE    /////////////////////////
///////////////////////    DANGER ZONE    /////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Step 7 -  //////////////////////////////////////////////////////
  // A Caching Rule to avoid caching. TODO - fix (?) 
  // Caching itself will still depend on the cache-control header 
  // const caching = new cloudflare.Ruleset("elarroyo-rule"+DEMOFLAG, {
  //   zoneId: zoneId,
  //   name: "elarroyo-rule"+DEMOFLAG,
  //   description: "Avoid caching",
  //   kind: "zone",
  //   phase: "http_request_cache_settings",
  //   rules: [{
  //     action: "set_cache_settings",
  //     actionParameters: {
  //       // cache: false,
  //       edgeTtl:
  //       {
  //         mode: "bypass_by_default",
  //       },
  //       browserTtl: {
  //         mode: "bypass",
  //       },
  //     },
  //     expression: "(http.request.full_uri contains \""+DEMOFLAG+"\")",
  //     description: "Set cache settings and custom cache key for " + route.pattern,
  //     enabled: true
  //   }]
  // })
  
  
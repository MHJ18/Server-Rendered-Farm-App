// const fs = require("fs");
// const name = "hello";
// const mytext = fs.readFile("./txt/test.txt", "utf-8", (err, data) => {
//   console.log(data);
//   fs.readFile(`./txt/first.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/${data2}.txt`, "utf-8", (err, data3) => {
//       let string = `${data}+${data3}`;
//       fs.writeFile("./txt/hell.txt", string, (err, da) => {});
//     });
//   });
// });

// console.log("Loading...");
// const newtext = `So Sorry if i mock u but ${mytext}.\n anyways feel free to contact me `;

// fs.writeFileSync("./txt/output.txt", newtext);//-
//------------------------------------------------------------------------//
const http = require('http');
const url = require('url');
const fs = require('fs');
const slug = require('slugify');
const replacetemplate = require('./replace');
let data = fs.readFileSync('./project1/starter/dev-data/data.json', 'utf8');
let data1 = JSON.parse(data);
const overview = fs.readFileSync(
  './project1/starter/templates/template-overview.html',
  'utf8'
);
const product = fs.readFileSync(
  './project1/starter/templates/product.html',
  'utf8'
);
const card = fs.readFileSync(
  './project1/starter/templates/template-card.html',
  'utf8'
);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  const path = req.url;
  if (path === '/home') {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    const result = data1.map((res) => replacetemplate(res, card)).join('');
    let abs = overview.replace(/{%PRODUCT_CARDS%}/g, result);

    res.end(abs);
  } else if (pathname === '/product') {
    const products = data1[query.id];
    const finalproduct = replacetemplate(products, product);
    res.end(finalproduct);
    slug(`${products.productName}`, {
      replacement: '-',
    });
    console.log(query);
  } else if (req.url === '/api') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(card);
  }
});
server.listen(3000, () => {
  console.log('server is up and running');
});

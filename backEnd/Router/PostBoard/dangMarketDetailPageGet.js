import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import mysql from "mysql";

export default function secondHandPost(request, response) {
  if (request.url.startsWith("/secondHandPost")) {
    let nth = request.url.split("=")[1];
    console.log(request.url);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`<script>const nthfromserver = ${nth}</script>`);

    response.write(htmlBox.htmlFunc(htmlBox.marketpost));
    response.end();
  }
  // if (request.url === "/market/market-post-page.js") {
  //   cmServer.fileDirectory(`market/market-post-page.js`, response);
  // }
  if (request.url.startsWith("/postSecondHand")) {
    console.log(request.url);
    let nth = request.url.split("=")[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select second_hand.*, dogName from second_hand inner join userinfo on second_hand.id = userinfo.id order by second_hand.date desc limit ${nth},1;`,
      // `select second_hand.*, dogName, image from second_hand inner join userinfo on second_hand.id = userinfo.id inner join userimage on second_hand.id = userimage.id order by second_hand.date desc limit ${nth},1;`,
      function (err, rows) {
        if (err) throw err;
        else {
          response.writeHead(200);
          response.write(JSON.stringify(rows));
          response.end();
        }
      }
    );
    conn.end();
  }
  if (request.url.startsWith("/withIndexSecondHandPost")) {
    let nth = request.url.split("=")[1];
    console.log(request.url);
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select idx from second_hand order by idx desc limit 1;`, // 19
      function (err, rows) {
        if (err) throw err;
        else {
          // console.log(rows[0].idx);
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(
            `<script>const nthfromserver = ${rows[0].idx - nth}</script>`
          );
          response.write(htmlBox.htmlFunc(htmlBox.marketpost));
          response.end();
        }
      }
    );
    conn.end();
  }
  // if (request.url === "/market/market-post-page.js") {
  //   cmServer.fileDirectory(`market/market-post-page.js`, response);
  // }
}

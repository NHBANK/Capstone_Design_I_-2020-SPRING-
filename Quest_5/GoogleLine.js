const express = require('express')
const mysql = require('mysql')
const fs = require('fs')
const app = express()
const port = 3000

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pjs618!!',
  database: 'mydb'
})
connection.connect();


app.get('/graph', (req, res) => {
  let fileRead = fs.readFile('./graph.html', function (err, html) {
    html = " " + html

    const qstr = 'select * from sensors ';
    connection.query(qstr, (err, rows, cols) => {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i = 0; i < rows.length; i++) {
        r = rows[i];
        data += comma + '[' + r.id + ',' + r.temp + ']';
        comma = ",";
      }

      var header = "data.addColumn('number', 'id');"
      header += "data.addColumn('number', 'Temp');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  });
})

app.listen(port, () => {
  console.log(`App listening to port ${port}`)
})
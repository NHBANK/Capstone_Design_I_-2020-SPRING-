const mysql = require('mysql')
const request = require('request')
const convert = require('xml-js')
const cron = require('node-cron')
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'pjs618!!',
    database:'mydb'
})

connection.connect();

cron.schedule('*/10 * * * *', ()=>{
    const url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4121063100'
request.get(url, (err,res,body)=>{
    if(err) throw err;

    const parse=JSON.parse(convert.xml2json(body, {compact:true,spaces:2}))
    const data = {temp:parseFloat(parse.rss.channel.item.description.body.data[0].temp._text)}

    var query = connection.query("insert into sensors SET?", data, function(err,rows,cols){
        if(err) throw err;
        console.log(`현재 온도 : ${data.temp}`);
        process.exit();
    })
    
})

})

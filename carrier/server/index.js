const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mycon = require('mysql');
const fileupload = require('express-fileupload');
const path1 = require("path");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(fileupload());
app.use(express.static('public'));

const c = mycon.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Kiruthi@2505",
    database: "carrier"
})

c.connect(function (error) {
    if (error) { console.log(error); }
    else { console.log('Database Connected'); }
})

app.post('/Addfile', (request, response) => {

    let file = request.files.filestore;
    let filename = file.name;
    let timestamp = Date.now();

    let filesource = path1.extname("public/upload" + file.name);
    let dat1 = new Date(timestamp);

    let url = 'http://localhost:3002/upload/';

    let path = __dirname + '/public/upload/' + file.name;


    let sql = 'insert into file_store(file_name,file_object,upload_date_time,file_source) values (?,?,?,?)';

    c.query(sql, [filename, url, dat1, filesource], (error, result) => { })

    file.mv(path, function (err) {
        if (err) {
            let s = { "status": "error" };
            response.send(s);
        }
        else {
            let s = { "status": "uploaded" };
            response.send(s);
            console.log("File uploaded successfully");
        }
    });

});
s
app.get('/Viewfile', (request, response) => {

    let sql = 'select * from file_store';
    c.query(sql, (error, result) => {
        response.send(result);
        console.log(result);
    })

})

app.listen(3002, () => {
    console.log("Server running on port number 3002");
});
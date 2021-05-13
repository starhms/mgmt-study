// json 기본 설정 시작
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');

const upload = multer({dest: './upload'})


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

// json 기본 설정 끝
app.get('/api/customers', (req, res) => {
    connection.query(
        "select * from ov_firewall_rule where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload'));


app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO ov_firewall_rule VALUES (?,?,?,?,?,?,?,?,null,?,now(), 0)';
    let device_name = req.body.device_name;
    let user_id = req.body.user_id;
    let password = req.body.password;
    let password2 = req.body.password2;
    let ip_address = req.body.ip_address;
    let policy_id = req.body.policy_id;
    let cisco_group = req.body.cisco_group;
    let product = req.body.product;
    let password3 = req.body.password2;
    let params = [device_name, user_id, password, password2, ip_address, policy_id, cisco_group, product, password3];
    connection.query(sql, params,
        (err,rows,fields) => {
            res.send(rows);
        })
    
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE ov_firewall_rule SET isDeleted = 1, deleteDate = now() where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows, fields) => {
            res.send(rows);
        }
        )
});

app.listen(port, () => console.log(`Listening on port ${port}`));
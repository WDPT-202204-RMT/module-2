const bcrypt = require("bcryptjs");

const text = "123456";
const salt = bcrypt.genSaltSync(25);

const hash = bcrypt.hashSync(text, salt);

console.log(hash);
//console.log(bcrypt.compareSync("123456", hash)); returns true
//console.log(bcrypt.compareSync("1234567", hash)); returns false

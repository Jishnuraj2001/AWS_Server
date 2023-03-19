const{Sequelize}=require("sequelize");
require("dotenv").config();

const sequelize=new Sequelize("jishnu","admin",process.env.db_password,{
    host:process.env.db_host,
    dialect:"mysql"
})


sequelize.authenticate()
.then(()=>console.log("Connection sucessfull!"))
.catch((error)=>console.log(error.message,"Connection Failed!"));

module.exports={
    sequelize
}
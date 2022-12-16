const md5 = require("md5");
const connection = require("../db/connection");
const userTasks = require("../task/user.task");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const userService = {

  doCreate: (req, res) => {
    let users = req.body;
    userTasks
      .getUserByEmailId(users.email)
      .then((user) => {
        if (user.length > 0) {
          return res.status(200).json("User already exists");
        } else {
          userTasks.insertUser(users).then((results) => {
            if (results) {
              return res.status(200).json("User successfully added");
            }
          });
        }
      })
      .catch((error) => {
        return res.status(500).json("Internal server error:" + error);
      });
  },

  doLogin: (req, res) => {
    let user = req.body;
    // getUserByFields(users.Userid,users.email,users.password,users.role).then((user) => {
    query = "select Userid,email,password,role from users where email = ?";
    connection.query(query, [user.email], (err, results) => {
      if (!err) {
        if (results.length <= 0 || results[0].password != user.password) {
          return res.status(401).json({Message:"incorrect email or password"});
        } else if (results[0].password == user.password) {
          const response = { email: results[0].email, role: results[0].role };
          const accesstoken = jwt.sign(response, process.env.ACCCESS_TOKEN, {
            expiresIn: "8h",
          });
          res.status(200).json({ token: accesstoken });
        } else {
          return res.status(400).json({ message: "something went wrong" });
        }
      } else {
        return res.status(500).json(err);
      }
    });
  },


//   var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user:process.env.EMAIL,
//     password:process.env.PASSWORD
//   }
// });
  
  forgotPassword: (req,res)=>
  {
    let user = req.body
    query= "select email,password from users where email=?"
    connection.query(query,[user.email],(err,results)=>{
      if(!err){
        if(results.length<=0)
        {
          res.status(404).json({ message:"No USER EXISTS WITH THIS EMAIL ID"})
        }
        else{
          var mailOptions = 
          {
            from:process.env.EMAIL,
            to:results[0].email,
            subject:"Forgot Password",
            html:"<p><b>Password Reset</b><br>Email: " +results[0].email+ "<br> Password: " + results[0].password+ "<br><a href:'http://localhost:4200/'>click the link to login</a></p>"
            }
            transporter.sendMail(mailOptions,function(err,info)
            {
              if(err)
              {
                consolelog(err)
              }
              else{
                console.log(info)
              }
            })
            
        }
      }
      else{
        return res.status(500).json(err)
      }
    })
  }

};
module.exports = userService;

const connection = require("../db/connection");

const userTasks = {
  insertUser: (values) => {
    const query =
      "INSERT INTO users (Userid,firstname,lastname,email,contactnumber,role,password,vesselname) VALUES (?,?,?,?,?,?,?,?)";
     const param = [
      values.Userid,
      values.firstname,
      values.lastname,
      values.email,
      values.contactnumber,
      values.role,
      values.password,
      values.vesselname,
    ];
    return new Promise((resolve, reject) => {
      connection.query(query, param, function (error, results) {
        if (error) reject(error);
        resolve(true);
      });
    });
  },

  getUserByEmailId: (email) => {
    const param = [email];
    const query = `SELECT * FROM users WHERE email = ?;`;
    return new Promise((resolve, reject) => {
      connection.query(query, param, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },

getUserByFields:(email,password,role) => {
  const param = [email];
  const query="select Userid,email,password,role from users where email = ?"
  return new Promise((resolve, reject) => {
    connection.query(query,param,(error,results)=>{
      if(error){
        reject (error)
      }
      resolve(results)
    });
  })
}

};


module.exports = userTasks;

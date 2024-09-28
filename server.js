const express = require("express");
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken')
const secret_Key = '@775Welcome@1254';



const sampleUser = {
    usernname: 'user',
    password: 'password'
}


//authentication middleware

const autheJwt = ((req, res, next)=>{

    const token = req.header('Authentication')?.split(' ')[1]; //Bearer token

    if(!token){
        return res.sendStatus(401) //unauthorized
    }

    jwt.verify(token, secret_Key, (err, user)=>{

        if(err){
            res.sendStatus(403) //forbideen
        }

        next();
    })

})




app.get("/add", autheJwt,(req, res) => {
  const {a, b} = req.query;

  let num1 = a;
  let num2 = b;
  
  //// Validate input parameters
  if(!num1 && !num2){
    return res.status(400).send('Missing parameters')
  }

  if(isNaN(num1) ||  isNaN(num2)){
    return res.status(400).send({error: 'Both num1 and num2 should be numeric values.'})
  }


  
const result = parseInt(num1)+parseInt(num1);


  res.json({
    message: 'success',
    result: result
  })

});

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});

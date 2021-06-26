const fs = require("fs")
const exec = require('child_process').exec;

// then print contents of directory according to instructions above
exec(`ls ${__dirname}}`, (error, data, getter) => {
    if(error){
      console.log(error, "error message")
      return
    }
  
    if(getter){
      console.log("data", data)
    }
  
    console.log(data)
  })
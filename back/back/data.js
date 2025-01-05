/*const fs=require("fs")

 const users= JSON.parse(fs.readFileSync("./data.json", "utf8"));

 const addUser = (user) => {

    const userStr = JSON.stringify([...users, user]);

    fs.writeFile("./data.json", userStr, (err) => {

        if (err) {

            console.log("Error writing file", err);
} else {

    console.log("Successfully wrote file");

}

});

};

 const removeUser = (usersAfterDelete) => {

    const userStr = JSON.stringify(usersAfterDelete);

    fs.writeFile("./data.json", userStr, (err) => {

        if (err) {

            console.log("Error writing file", err);

        } else {

            console.log("Successfully wrote file");

        }

    });

};



module.exports = users*/
const users = [
    {
        "name": "fat",
        "email": "gmail.com"
    },
    {
        "name": "tay",
        "email": "hotmail"
    },
    {
        "name": "raf",
        "email": "balermail"
    },
    {
        "name": "anj",
        "email": "dhur.com"
    }
]
module.exports=users
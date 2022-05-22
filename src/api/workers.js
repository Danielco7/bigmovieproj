const urlusers = "http://localhost:8000/api/Users"

const WorkersJson=[
    {
        fname:"daniel",
        Lname:"cohen",
        username:"danielco7",
        password:"1oz2daniel",
        premissions:[
        "View Movies",
        "View Subscriptions",
        "View Users"
        ],
        admin:true
    }, 
    {
        fname:"guest",
        Lname:"guest",
        username:"onlineguest",
        password:"123456",
        premissions:[
        "View Movies",
        "View Subscriptions",
        "View Users"
        ],
        admin:true,
    },
    {
        fname:"asdasd",
        Lname:"asdasd",
        username:"lisa7",
        password:"1oz2daniel",
        premissions:[
        "View Subscriptions",
        "Create Subscriptions",
        "Update Subscription",
        "View Movies",
        "Create Movies",
        "Update Movie"
        ],
        admin:false,
    },
    {
        fname:"shlomi",
        Lname:"kotch",
        username:"shlomimi",
        password:"1234",
        premissions:[
        "View Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Delete Movies"
        ],
        admin:false
    },
    {
        fname:"idasdsadasdasd",
        Lname:"dljdasdasd",
        username:"dddljdasd",
        password:"123456",
        premissions:[
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscription"
        ],
        admin:false,
    },
    {
        fname:"shlomo",
        Lname:"cohen",
        username:"shlomocohen123",
        password:"1oz2daniel",
        premissions:[
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscription",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movie"
        ],
        admin:false,
    },
   
    

]

export default WorkersJson;

// importing
import express from "Express"
import mongoose from "mongoose"
import Messages from "./dbmessages.js"
import Pusher from "pusher"
import Cors   from "cors"
//app config
const app=express()
const port=process.env.PORT ||9000

const pusher = new Pusher({
    appId: "1285872",
    key: "0a09f35f5a94251ac389",
    secret: "47d175f7e725452c0e3f",
    cluster: "ap2",
    useTLS: true
  });

//middleware's
app.use(express.json());
app.use(Cors());
//DB config
const connection_url='mongodb+srv://Utkarsh:fvXUl4pl0gfacWIi@cluster0.6sldz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//???
const db=mongoose.connection
db.once('open',()=>{
    console.log("DB connected")
    //pusher 
    const msgcollection=db.collection("messagecontents");
    const changeStream=msgcollection.watch();
    // whenever a change occurs it will trigger changestream
    changeStream.on('change',(change)=>{
        console.log('a change occured',change);

        if(change.operationType ==='insert') {
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            });
        }else{
                console.log('error triggering pusher');
            }
    });     
});

//api routes 
app.get("/",(req,res)=>res.status(200).send("hello world"));

app.get("/messages/sync",(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});
app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            //  for internal server error
            res.status(500).send(err);
        }
        else{
            //created ok
            res.status(201).send(data);
        }
    });
});

//listen
app.listen(port,()=>console.log('listening on localhost:${port}'));
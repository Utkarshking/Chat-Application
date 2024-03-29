import React,{useState} from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, MoreVert, AttachFile } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios"
function Chat({messages}) {
  const[Input,setInput]=useState("");
  const sendMessage= async (e)=>{
    // prevents the refresh
    e.preventDefault();
    await axios.post("/messages/new",{
        "message":Input,
        "name":"Demo App",
        "timestamp":"Just now!",
        "received":true,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen at..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message)=>(
           <p className={`chat__message ${message.received && "chat__receiver"}`}>
           <span className="chat__name">{message.name}</span>
          {message.message}
           <span className="chat__timestamp">{message.timestamp}</span>
         </p>
        ))}
        
      </div>
      <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input value={Input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a Message" type="text"/>
               <button onClick={sendMessage}type="submit">
                   type a message
               </button>
          </form>
          <MicIcon />
      </div>
    </div>
  );
}

export default Chat;

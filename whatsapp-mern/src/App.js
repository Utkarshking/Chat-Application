import React,{useEffect, useState}from "react"
import './App.css';
import Sidebar from "./Sidebar.js"
import Chat from "./Chat.js"
import Pusher from 'pusher-js'
import axios from "./axios";

function App() {
  const [messages,setMessages]=useState([]);

  useEffect(()=>{
      axios.get('/messages/sync').then((response)=>{
        setMessages(response.data);
      });
  },[])

  useEffect(() => {    
    const pusher = new Pusher('0a09f35f5a94251ac389', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind("inserted", (data)=>{
      alert(JSON.stringify(data));
      setMessages([...messages,data])
    });
    //  cleanup function 
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
      {/* sidebar */}
      <Sidebar />
       {/* chat component */}
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;

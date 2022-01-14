import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat.js"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar,IconButton} from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@material-ui/icons";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
          <Avatar  src="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1699%26cropX2%3D3845%26cropY1%3D559%26cropY2%3D2704"/>
        <div className="sidebar__headerRight">
            <IconButton>
        <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
         <div className="sidebar__searchContainer">
             <SearchOutlined />
             <input placeholder="search or start a new chat "
             type="text"/>
         </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;

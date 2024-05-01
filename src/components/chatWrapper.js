import React from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./chat";

function ChatWrapper(props) {
    const navigate = useNavigate();

    return <Chat {...props} navigate={navigate} />
}

export default ChatWrapper;
import React, { Component } from "react";
import Pusher from "pusher-js"
import { fetchChats, postChat } from "../actions/chatActions";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import './Styles/chat.css'


class chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'EN',
            chatMessage: ''
        };
        this.pusher = null;
        this.chatContainerRef = React.createRef();

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.fetchChatData = this.fetchChatData.bind(this);
        this.sendChatData = this.sendChatData.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.fetchChatData();

        this.pusher = new Pusher('59737af5c15b06f7dce2', {
            cluster: 'mt1'
        });
        const channel = this.pusher.subscribe('chatNotifs');
        channel.bind('chat-submitted', (data) => {
            this.fetchChatData();
        });
    }

    componentWillUnmount() {
        if (this.pusher) {
            this.pusher.unsubscribe('chatNotifs');
            this.pusher.disconnect();
        }
    }

    componentDidUpdate(prevProps) {
        const { chats } = this.props;
    
        if (chats.length > prevProps.chats.length) {
            if (this.chatContainerRef.current) {
                this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
            }
        }
    }

    fetchChatData() {
        const { dispatch } = this.props;
        const { selectedLanguage } = this.state;
        dispatch(fetchChats(selectedLanguage)).then(() => {
            if (this.chatContainerRef.current) {
                this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
            }
        });
    }

    sendChatData() {
        const { dispatch, username } = this.props;
        const { chatMessage, selectedLanguage } = this.state;

        dispatch(postChat(chatMessage, username, selectedLanguage));
        this.setState({ chatMessage: '' });
    }

    handleLanguageChange(event) {
        console.log('event');
        const selectedLanguage = event.target.value;
        this.setState({ selectedLanguage }, () => {
            this.fetchChatData();
        });
    }

    handleInputChange(event) {
        this.setState({ chatMessage: event.target.value });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendChatData();
        }
    }

    handleLogout() {
        const { dispatch, navigate } = this.props;
        dispatch(logoutUser(navigate));
    }

    render() {
        const { chats, username } = this.props;
        const { chatMessage, selectedLanguage } = this.state;
    
        const modifiedChats = chats.map((chat) => ({
            ...chat,
            isUser: chat.username === username,
        }));
    
        return (
            <div className="chat-container" ref={this.chatContainerRef}>
                <div className="controls">
                <select
                    value={selectedLanguage}
                    onChange={this.handleLanguageChange}
                    className="language-dropdown"
                >
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                    <option value="ES">Spanish</option>
                </select>
                <button
                    onClick={this.handleLogout}
                    className="logout-button"
                >
                    Log Out
                </button>
                </div>
                {modifiedChats.map((chat, index) => (
                    <div
                        key={index}
                        className={`chat-message ${chat.isUser ? 'user-message' : 'other-message'}`}
                    >
                        <span className="chat-username">{chat.username}: </span>
                        <p>{chat.translatedText}</p>
                        <small className="timestamp">{new Date(chat.timeStamp).toLocaleString()}</small>
                    </div>
                ))}
                <input
                    type="text"
                    value={chatMessage}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress}
                    className="chat-input"
                    placeholder="Type a message..."
                />
                
                <button
                    onClick={this.sendChatData}
                    className="send-chat-button"
                >
                    Send
                </button>
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        chats: state.chat.chats,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(chat);
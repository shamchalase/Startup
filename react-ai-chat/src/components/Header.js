import React from 'react';
import { Menu, Plus, Bot } from 'lucide-react';

const Header = ({ onToggleSidebar, onNewChat }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="header-button" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="header-logo">
          <Bot size={24} />
          <h1>AI Chat</h1>
        </div>
      </div>
      
      <div className="header-center">
        <span className="header-title">Generative AI Assistant</span>
      </div>
      
      <div className="header-right">
        <button 
          className="header-button new-chat-button" 
          onClick={onNewChat}
          aria-label="New chat"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
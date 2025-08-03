import React, { useState, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize with a default conversation
  useEffect(() => {
    const defaultConversation = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    setConversations([defaultConversation]);
    setCurrentConversationId(defaultConversation.id);
  }, []);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const updateConversation = (conversationId, messages) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, messages, title: messages.length > 0 ? messages[0].content.slice(0, 30) + '...' : 'New Chat' }
          : conv
      )
    );
  };

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      const remaining = conversations.filter(conv => conv.id !== conversationId);
      if (remaining.length > 0) {
        setCurrentConversationId(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  const currentConversation = conversations.find(conv => conv.id === currentConversationId);

  return (
    <div className="app">
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={createNewConversation}
      />
      <div className="app-body">
        <Sidebar 
          isOpen={isSidebarOpen}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={setCurrentConversationId}
          onDeleteConversation={deleteConversation}
          onNewConversation={createNewConversation}
        />
        <ChatContainer 
          conversation={currentConversation}
          onUpdateConversation={updateConversation}
        />
      </div>
    </div>
  );
}

export default App;
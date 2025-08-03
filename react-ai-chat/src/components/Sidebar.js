import React from 'react';
import { MessageSquare, Trash2, Plus } from 'lucide-react';

const Sidebar = ({ 
  isOpen, 
  conversations, 
  currentConversationId, 
  onSelectConversation, 
  onDeleteConversation, 
  onNewConversation 
}) => {
  if (!isOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button 
          className="sidebar-new-chat"
          onClick={onNewConversation}
        >
          <Plus size={16} />
          New Conversation
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="conversations-list">
          {conversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`conversation-item ${currentConversationId === conversation.id ? 'active' : ''}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="conversation-content">
                <MessageSquare size={16} />
                <span className="conversation-title">{conversation.title}</span>
              </div>
              <button 
                className="delete-conversation"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                aria-label="Delete conversation"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="sidebar-info">
          <p>Built with React & AI</p>
          <p>Total conversations: {conversations.length}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useRef, useEffect, useState } from "react";
import { ClipboardIcon, ChatBubbleLeftEllipsisIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useGetMessagesByConversationIdQuery, useGetMessagesQuery, useSendMessageMutation } from "store/services/messageApi";

import { v4 as uuid } from "uuid";
import { useGetPodcastByIdQuery } from "store/services/podcastApi";
import { ChatContainerRoot, ChatContainerContent, Button, Message, MessageAvatar, MessageContent, Markdown } from "components/ChatContainer";

type ConversationProps = {
  podcastId: string;
  podcast: any;
  sendToScript: (podcastId: string, content: string) => void;
};

const ConversationV2 = ({sendToScript, podcastId, podcast: podcastData}:ConversationProps) => {
  const [messages, setMessages] = useState([
    { sender: "Bot", text: "Hi there! I am an AI assistant to help to create podcast scripts. Please provide me with a topic or a question.", id: uuid() },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfChatRef = useRef<HTMLDivElement | null>(null);
  

  const conversationId = podcastData.conversations ? podcastData.conversations[0]?.id : null;

  console.log("Conversation ID:", conversationId);

  const { data: messagesData, isLoading: messagesLoading } = useGetMessagesByConversationIdQuery(conversationId, 
    { 
      refetchOnMountOrArgChange: true,
      skip: conversationId === null,
    }
  );

  const isLoading = messagesLoading;

  const scrollToChatMessages = () => {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  useEffect(() => {
    if(messages.length > 0) {
      scrollToChatMessages();
    }
    
  }, [messages]);

  useEffect(() => {
    if (messagesData && messagesData.length > 0) {
      console.log("Messages Data:", messagesData);
      // Transform the data to match the expected format
      const transformedMessages = messagesData.map((message: { role: string; content: string; id: string, createdAt: string }) => ({
        sender: message.role === "user" ? "User" : "Bot",
        text: message.content,
        id: message.id,
        createdAt: message.createdAt,
      }));
      // Set the transformed messages to the state

      // sort the messages by createdAt
      transformedMessages.sort((a:any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      

      setMessages(transformedMessages);
    }
  }
    , [messagesData]);

  const [sendMessage] = useSendMessageMutation(); 
  

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageId: string = uuid();
    const botMessageId: string = uuid();

    // Add the user's message to the chat
    setMessages([...messages, { sender: "User", text: newMessage, id: messageId }]);
    setNewMessage("");

    if(podcastData.conversations && podcastData.conversations.length > 0) {
      sendMessage({ role: "user", content: newMessage, conversationId, model: "gpt-4o-mini" });
    } 

    // Call the API
    setIsTyping(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_AI_AGENT_API_URL}/api/v1/podcast/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          topic: newMessage,
          stream: true,
          agents: [
            {
              name: "Steve",
              persona: "Steve is a podcast host who is very friendly and helpful. He is always ready to assist you with your podcasting needs.",
              voice: "alloy",
            },
            {
              name: "Eve",
              persona: "Eve is a podcast participant who is very knowledgeable and insightful. She provides valuable insights and information to the podcast.",
              voice: "nova",
            },
          ],
        }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let full_response = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        console.log("Chunk:", chunk);

        if(done) {
          console.log("Stream finished", full_response);
          setIsTyping(false);
        }

        debugger;


        if (chunk) {
          const chunkData = JSON.parse(chunk);

          console.log("Chunk Data:", chunkData);

          if (!chunkData || !chunkData.data) {
            console.error("Invalid chunk data:", chunkData);
            continue;
          }

          if(podcastData.conversations && podcastData.conversations.length > 0 && chunkData.response ) {
            console.log("Sending message to conversation:", chunkData.response);

            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: chunkData.agent_name, text: chunkData.response, id: uuid() },
            ]);
            full_response += chunkData.response;

            sendMessage({ role: "assistant", content: chunkData.response, conversationId, model: "gpt-4o-mini" });
          }

          scrollToChatMessages();

        }
      }
    } catch (error) {
      console.error("Error fetching the podcast stream:", error);
    } finally {


      // "content": full_response, "role": "assistant", "conversationId": "e9b57981-268f-4afc-9444-c75bf35deed9", "model": "gpt-4o-mini"
      // sendMessage({ role: "user", content: newMessage, conversationId: 'e9b57981-268f-4afc-9444-c75bf35deed9', model: "gpt-4o-mini" });
      setIsTyping(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
  };

  const handleAddToScript = (text: string) => {
    console.log("Add to Script:", text);
    // Implement the logic for adding to script

    sendToScript(podcastId, text);
  };

  const handleAddToChat = (text: string) => {
    console.log("Add to Chat:", text);
    // Implement the logic for adding to chat
    setNewMessage(text);
  };

  const groupedMessagesByIdArray = messages.reduce((acc: Record<string, { sender: string; text: string; id: string }[]>, message) => {
    const { id } = message;

    
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(message);
    return acc;
  }
    , {});

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex h-[400px] w-full flex-col overflow-hidden">
      <ChatContainerRoot className="flex-1">
        <ChatContainerContent className="space-y-4 p-4">
          {messages.map((message) => {
            const isAssistant = message.sender === "Bot";

            return (
              <Message
                key={message.id}
                className={
                  message.sender !== "Bot" ? "justify-end" : "justify-start"
                }
              >
                {isAssistant && (
                  <MessageAvatar
                    src="/avatars/ai.png"
                    alt="AI Assistant"
                    fallback="AI"
                  />
                )}
                <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
                  {isAssistant ? (
                    <div className="bg-secondary text-foreground prose rounded-lg p-2">
                      <Markdown>{message.text}</Markdown>
                    </div>
                  ) : (
                    <MessageContent className="bg-primary text-primary-foreground">
                      {message.text}
                    </MessageContent>
                  )}
                </div>
              </Message>
            )
          })}
        </ChatContainerContent>
      </ChatContainerRoot>
    </div>
    </div>
  );
};

export default ConversationV2;
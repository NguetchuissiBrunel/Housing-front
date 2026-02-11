"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Image as ImageIcon, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { getConversations, getMessages, sendMessage } from "@/app/actions/message-actions";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface MessagesClientProps {
    initialSession: any;
}

export default function MessagesClient({ initialSession }: MessagesClientProps) {
    const searchParams = useSearchParams();
    const conversationIdParam = searchParams.get('conversation');

    const router = useRouter();
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Use initialSession as the source of truth for the user
    const currentUser = initialSession;

    useEffect(() => {
        const fetchConversations = async () => {
            if (currentUser?.id) {
                const result = await getConversations(currentUser.id);
                if (result.success && result.data) {
                    setConversations(result.data);

                    if (conversationIdParam) {
                        const conv = result.data.find((c: any) => c.id === conversationIdParam);
                        if (conv) setSelectedConversation(conv);
                    } else if (result.data.length > 0 && !selectedConversation) {
                        setSelectedConversation(result.data[0]);
                    }
                }
            }
        };
        fetchConversations();
    }, [currentUser?.id, conversationIdParam]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedConversation) {
                const result = await getMessages(selectedConversation.id);
                if (result.success && result.data) {
                    setMessages(result.data);
                }
            }
        };
        fetchMessages();

        // Refresh messages periodically for demo (polling)
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [selectedConversation?.id]);



    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUser) return;

        const messageContent = newMessage;
        setNewMessage("");

        try {
            const result = await sendMessage({
                conversationId: selectedConversation.id,
                senderId: currentUser.id,
                content: messageContent,
            });

            if (result.success) {
                setMessages(prev => [...prev, result.data]);

                setConversations(prev => prev.map(conv =>
                    conv.id === selectedConversation.id
                        ? { ...conv, lastMessage: messageContent, lastMessageTime: new Date() }
                        : conv
                ));
            } else {
                toast.error("Erreur lors de l'envoi du message");
            }
        } catch (error) {
            console.error("Send message error:", error);
            toast.error("Une erreur s'est produite");
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Hier';
        } else {
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Connexion requise</h2>
                    <p className="text-slate-600 mb-6">Vous devez être connecté pour accéder à vos messages</p>
                    <Link href="/login" className="text-brand-primary font-semibold hover:underline">
                        Se connecter
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="container py-8">
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Retour au dashboard</span>
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900">Messages</h1>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                    <div className="grid grid-cols-12 h-full">
                        {/* Conversations List */}
                        <div className="col-span-12 md:col-span-4 border-r border-slate-200 flex flex-col">
                            <div className="p-4 border-b border-slate-200">
                                <h2 className="text-lg font-bold text-slate-900">Conversations</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {conversations.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <p className="text-slate-500">Aucune conversation</p>
                                    </div>
                                ) : (
                                    conversations.map((conv) => {
                                        const isMyStudent = currentUser.id === conv.studentId;
                                        const otherPerson = isMyStudent ? conv.landlord : conv.student;
                                        const otherPersonName = otherPerson?.name || "Support";

                                        return (
                                            <button
                                                key={conv.id}
                                                onClick={() => setSelectedConversation(conv)}
                                                className={`w-full p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-brand-primary' : ''
                                                    }`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-primary font-bold overflow-hidden">
                                                        {conv.property?.images?.[0] ? (
                                                            <img src={conv.property.images[0]} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            otherPersonName.charAt(0)
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h3 className="font-bold text-slate-900 truncate">{otherPersonName}</h3>
                                                            {conv.lastMessageTime && (
                                                                <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                                                                    {formatTime(conv.lastMessageTime)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-slate-600 truncate mb-1">{conv.property?.title || "Discussion"}</p>
                                                        <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="col-span-12 md:col-span-8 flex flex-col">
                            {selectedConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-primary font-bold overflow-hidden">
                                                {selectedConversation.property?.images?.[0] ? (
                                                    <img src={selectedConversation.property.images[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    "?"
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    {currentUser.id === selectedConversation.studentId
                                                        ? selectedConversation.landlord?.name
                                                        : selectedConversation.student?.name}
                                                </h3>
                                                {selectedConversation.propertyId && (
                                                    <Link
                                                        href={`/housing/${selectedConversation.propertyId}`}
                                                        className="text-sm text-brand-primary hover:underline"
                                                    >
                                                        {selectedConversation.property?.title}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-slate-600" />
                                            </button>
                                            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                                                <Video className="w-5 h-5 text-slate-600" />
                                            </button>
                                            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                                                <MoreVertical className="w-5 h-5 text-slate-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {messages.map((message) => {
                                            const isMine = message.senderId === currentUser.id;
                                            return (
                                                <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[70%] ${isMine ? 'order-2' : 'order-1'}`}>
                                                        <div
                                                            className={`rounded-2xl px-4 py-3 ${isMine
                                                                ? 'bg-brand-primary text-white'
                                                                : 'bg-slate-100 text-slate-900'
                                                                }`}
                                                        >
                                                            <p className="text-sm leading-relaxed">{message.content}</p>
                                                        </div>
                                                        <p className={`text-xs text-slate-500 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                                                            {formatTime(message.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input */}
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200">
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center flex-shrink-0"
                                            >
                                                <Paperclip className="w-5 h-5 text-slate-600" />
                                            </button>
                                            <button
                                                type="button"
                                                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center flex-shrink-0"
                                            >
                                                <ImageIcon className="w-5 h-5 text-slate-600" />
                                            </button>
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Écrivez votre message..."
                                                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newMessage.trim()}
                                                className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-primary-dark disabled:bg-slate-300 flex items-center justify-center flex-shrink-0 transition-colors"
                                            >
                                                <Send className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Sélectionnez une conversation</h3>
                                        <p className="text-slate-600">Choisissez une conversation pour commencer à discuter</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

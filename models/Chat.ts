export interface ChatList {
	_id: string;
	chatId: string;
	user: string;
	bot: string;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
}

export interface Message {
	role: string;
	user: string;
	content: string;
	_id: string;
	timestamp: string;
}
export type ChatModel = {
  start: number;
  length: number;
  id: number;
};

export type PaginationListModel = {
  length: number;
  start: number;
};

export type SendMessageModel = {
  recipient: number;
  content: string;
};

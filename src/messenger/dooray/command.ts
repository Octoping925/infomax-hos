export interface DooraySlashCommand {
  tenantId: string;
  tenantDomain: string;
  channelId: string;
  channelName: string;
  userId: string;
  command: string;
  text: string;
  responseUrl: string;
  appToken: string;
  cmdToken: string;
  triggerId: string;
}

export interface DoorayButtonInteraction {
  mqType: number;
  tenant: { id: string; domain: string };
  appId: string;
  appIconAttachId: string;
  commandId: string;
  callbackId: string;
  commandName: string;
  commandRequestUrl: string;
  channel: { id: string; name: string };
  user: { id: string; email: string };
  command: string;
  text: string;
  responseUrl: string;
  appToken: string;
  cmdToken: string;
  triggerId: string;
  actionName: string;
  actionValue: string;
  channelLogId: string;
  originalMessage: {
    id: string;
    channelId: string;
    responseType: string;
    type: number;
    senderId: string;
    sentAt: number;
    seq: number;
    text: string;
    attachments: any[];
    flags: number;
    replaceOriginal: boolean;
    deleteOriginal: boolean;
  };
  dbId: number;
}

import { ChatCompletionRequestMessageRoleEnum, ChatCompletionRequestMessage } from "openai";
import getResponse from "./get_response";

/**
 * チャットの管理を行うクラス。
 * GPT-3 の API で使用するメッセージの追加、削除、取得などを行います。
 *
 * @example
 *   (async () => {
 *     const chatManager = new ChatManager();
 *     await chatManager.initializeMessages("your_api_key");
 *     console.log(chatManager.getMessages());
 *   })();
 */
class ChatManager {
  messages: Array<{ role: ChatCompletionRequestMessageRoleEnum; content: string }> = [];

  /**
   * ChatManager クラスのインスタンスを生成し、メッセージを初期化します。
   */
  constructor() {
    this.clearMessages();
  }

  /**
   * メッセージをすべてクリアします。
   */
  clearMessages(): void {
    this.messages = [];
  }

  /**
   * メッセージを初期化し、ユーザーのメッセージとアシスタントの回答を追加します。
   * @param api_key GPT-3 APIのキー
   * @returns Promise<void>
   */
  async initializeMessages(api_key: string): Promise<void> {
    this.clearMessages();

    this.appendUserMessage("こんにちは。");
    this.appendAssistantAnswer(await getResponse(this.getMessages(), api_key));
  }

  /**
   * メッセージがあるかどうかを確認します。
   * @returns boolean メッセージがある場合は true、ない場合は false
   */
  hasMessages(): boolean {
    return !!this.messages.length;
  }

  /**
   * メッセージの長さを管理し、必要に応じて古いメッセージを削除します。
   */
  manageMessages(): void {
    while (this.getConversation().join("").length >= 4000) {
      this.messages.splice(0, 3);
    }
  }

  /**
   * アシスタントの回答をメッセージに追加します。
   * @param answer アシスタントの回答
   */
  appendAssistantAnswer(answer: string): void {
    this.messages.push({ role: ChatCompletionRequestMessageRoleEnum.Assistant, content: answer });
    this.manageMessages();
  }

  /**
   * ユーザーのメッセージを追加します。
   * @param message ユーザーのメッセージ
   */
  appendUserMessage(message: string): void {
    this.messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: message });
    this.manageMessages();
  }

  /**
   * 会話の内容を取得します。
   * @returns Array<string> 会話の内容を格納した配列
   */
  getConversation(): Array<string> {
    return this.messages
      .slice(1)
      .reverse()
      .map((message) => message.content);
  }

  /**
   * メッセージを取得します。
   * @returns ChatCompletionRequestMessage[] メッセージの配列
   */
  getMessages(): ChatCompletionRequestMessage[] {
    return this.messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));
  }

  /**
   * 最後のメッセージを取得します。
   * @returns string 最後のメッセージの内容
   */
  getLastMessage(): string {
    return this.messages[this.messages.length - 1].content;
  }
}

export default ChatManager;

if (require.main === module) {
  (async () => {
    const chatManager = new ChatManager();
    await chatManager.initializeMessages("your_api_key");
    console.log(chatManager.getMessages());
  })();
}

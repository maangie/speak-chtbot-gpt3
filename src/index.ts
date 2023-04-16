import ChatManager from "./chat_manager";
import getResponse from "./get_response";
import speak from "./speak";
import { setCookie, getCookie } from "./cookie";

(() => {
  /**
   * IDを使ってHTMLElementを取得するヘルパー関数
   * @param {string} name - HTMLElementのID
   * @return {HTMLElement} 指定されたIDのHTMLElement
   */
  const $ = (name: string): HTMLElement => <HTMLElement>document.getElementById(name);

  /**
   * apiKeyの値に基づいて、apiKey入力またはuserInput入力にフォーカスを設定
   * @param {HTMLInputElement} apiKey - apiKeyの入力要素
   */
  const setUpFocus = (apiKey: HTMLInputElement) => {
    if (apiKey.value.length) $("user-input").focus();
    else apiKey.focus();
  };

  /**
   * Enterキーでメッセージを送信できるようにする
   * @param {HTMLInputElement} input - 入力要素
   * @param {HTMLButtonElement} submitButton - 送信ボタン要素
   */
  const handleEnterKey = (input: HTMLInputElement, submitButton: HTMLButtonElement) => {
    input.onkeydown = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
      }
    };
  };

  /**
   * submitボタンのクリックイベントを処理
   * @async
   * @param {ChatManager} chatManager - ChatManagerインスタンス
   * @param {HTMLInputElement} apiKey - apiKeyの入力要素
   * @param {HTMLInputElement} userInput - ユーザー入力要素
   * @param {HTMLButtonElement} submitButton - 送信ボタン要素
   */
  const handleSubmit = async (
    chatManager: ChatManager,
    apiKey: HTMLInputElement,
    userInput: HTMLInputElement,
    submitButton: HTMLButtonElement
  ) => {
    const apiKeyValue = apiKey.value;
    setCookie("apiKey", apiKeyValue);

    // 処理中はsubmitボタンを無効化
    submitButton.disabled = true;
    submitButton.innerText = "処理中...";

    // ユーザーメッセージとアシスタントの回答をチャットに追加
    if (chatManager.hasMessages()) {
      chatManager.appendUserMessage(userInput.value);
      chatManager.appendAssistantAnswer(await getResponse(chatManager.getMessages(), apiKeyValue));
    } else {
      await chatManager.initializeMessages(apiKeyValue);
    }

    // アシスタントの最後のメッセージを読み上げ
    await speak(chatManager.getLastMessage());
    // userInputコンテナを表示し、値をクリアしてフォーカスを設定
    $("user-input-container").hidden = false;
    userInput.value = "";
    userInput.focus();

    // submitボタンを再度有効化
    submitButton.disabled = false;
    submitButton.innerText = "Submit";
  };

  // HTML要素への参照を取得
  const apiKey = <HTMLInputElement>$("api-key");
  const userInput = <HTMLInputElement>$("user-input");
  const submitButton = <HTMLButtonElement>$("submit");

  // ChatManagerインスタンスを初期化
  const chatManager = new ChatManager();

  // クッキーからapiKeyをロードし、入力フォーカスを設定
  apiKey.value = getCookie("apiKey");
  setUpFocus(apiKey);

  // 入力要素にEnterキーイベントリスナを追加
  for (const input of document.querySelectorAll<HTMLInputElement>("input[type='text']"))
    handleEnterKey(input, submitButton);

  /**
   * submitボタンのonclickイベントを設定
   */
  $("submit").onclick = () => handleSubmit(chatManager, apiKey, userInput, submitButton);
})();

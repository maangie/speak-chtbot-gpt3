import ChatManager from "./chat_manager";
import getResponse from "./get_response";
import speak from './speak';
import { setCookie, getCookie } from './cookie';

(() => {
  const $ = (name: string): HTMLElement => <HTMLElement>document.getElementById(name);

  const root: HTMLElement = document.getElementById("root")!;

  const chatManager = new ChatManager();

  const apiKey = <HTMLInputElement>$('api-key');
  const userInput = <HTMLInputElement>$('user-input');
  const submitButton = <HTMLButtonElement>$("submit");

  apiKey.value = getCookie('apiKey');

  if (apiKey.value.length) $('user-input').focus();
  else apiKey.focus();

  for (const input of document.querySelectorAll<HTMLInputElement>("input[type='text']")) {
    input.onkeydown = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
      }
    };
  }

  $('submit').onclick = async () => {
    const apiKeyValue = apiKey.value;
    setCookie('apiKey', apiKeyValue);

    submitButton.disabled = true;
    submitButton.innerText = '処理中...';

    if (chatManager.hasMessages()) {
      chatManager.appendUserMessage(userInput.value)
      chatManager.appendAssistantAnswer(await getResponse(chatManager.getMessages(), apiKeyValue));
    } else {
      await chatManager.initializeMessages(apiKeyValue);
    }

    await speak(chatManager.getLastMessage());
    $('user-input-container').hidden = false;
    userInput.value = '';
    userInput.focus();

    submitButton.disabled = false;
    submitButton.innerText = 'Submit';
  }
})();

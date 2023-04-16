import { Configuration, OpenAIApi, ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";

let configuration: Configuration | null = null;
let openai: OpenAIApi | null = null;

/**
 * getResponseは、GPT-3.5-turboモデルを使用してOpenAI APIからチャット応答を取得する非同期関数です。
 * @function
 * @async
 * @param {ChatCompletionRequestMessage[]} messages - チャットダイアログのメッセージの配列。
 * @param {string} apiKey - OpenAI APIの認証キーです。
 * @returns {Promise<string>} APIからの応答。
 * @example
 * const messages = [
 *   { role: "user", content: "Who won the world series in 2020?" },
 *   { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
 *   { role: "user", content: "Who was the MVP?" }
 * ];
 * const apiKey = "your_openai_api_key";
 * console.log(await getResponse(messages, apiKey));
 */
const getResponse = async (messages: ChatCompletionRequestMessage[], apiKey: string): Promise<string> => {
    if (!configuration) configuration = new Configuration({ apiKey });
    if (!openai) openai = new OpenAIApi(configuration);

    const chatCompletionResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    })

    return <string>chatCompletionResponse.data.choices[0].message?.content;
  }

if (require.main === module) {
  (async () => {
    const messages = [
      { role: ChatCompletionRequestMessageRoleEnum.User, content: "Who won the world series in 2020?" },
      { role: ChatCompletionRequestMessageRoleEnum.Assistant, content: "The Los Angeles Dodgers won the World Series in 2020." },
      { role: ChatCompletionRequestMessageRoleEnum.User, content: "Who was the MVP?" }
    ];
    const apiKey = "your_api_key";
    console.log(await getResponse(messages, apiKey));
  })();
}

export default getResponse;

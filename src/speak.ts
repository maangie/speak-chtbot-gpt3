/**
 * メッセージを読み上げ、読み上げが終了するまで待機する関数。
 * @param message 読み上げる文字列
 * @returns Promise<void> 読み上げが終了したら解決される Promise
 * @example
 *   (async () => {
 *     await speak('こんにちは、お元気ですか？');
 *     console.log('読み上げが終了しました。');
 *   })();
 */
const speak = async (message: string): Promise<void> => {
  return new Promise(resolve => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'ja-JP';

    speech.onend = () => {resolve();}
    window.speechSynthesis.speak(speech);
  });
};

export default speak;

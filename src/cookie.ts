import Cookies from 'js-cookie';

/**
 * 与えられた名前と値でクッキーを設定します。
 *
 * @param name - クッキーの名前。
 * @param value - クッキーに格納する値。値がない場合は空の文字列が格納されます。
 * @returns 成功時には設定した値を返し、失敗時にはundefinedを返します。
 */

export const setCookie = (name: string, value: string|null): string|undefined =>
  Cookies.set(name, value ? value : '', { sameSite: 'strict' });

/**
 * 指定された名前のクッキーの値を取得します。
 *
 * @param name - 取得するクッキーの名前。
 * @returns クッキーの値が存在する場合はその値、存在しない場合は空の文字列を返します。
 */
export const getCookie = (name: string): string => {
  const value = Cookies.get(name);
  return value ? value : '';
};

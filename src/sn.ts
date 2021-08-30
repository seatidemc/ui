import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const ENDPOINT = "https://seatide.leviatan.cn"
const TRANSLATION: Dictionary = {
	'User not exists.': "用户不存在。",
	"Invalid action.": "无效操作。",
	"Username already exists.": "用户名已被使用。"
}

export function post(url: string, data: any) {
	return new Promise<AxiosResponse<BackendResponse>>((re, rj) => {
		axios
			.post(ENDPOINT + url, qs.stringify(data))
			.then(r => re(r))
			.catch(e => rj(e));
	});
}

export function translate(str: string) {
	if (Object.keys(TRANSLATION).includes(str)) return TRANSLATION[str];
	return "TRANSLATION_NOT_FOUND"
}

export function setToken(token: string, username: string) {
	localStorage.setItem("seatide-login-token", token);
	localStorage.setItem("seatide-username", username);
}

export function delToken() {
	localStorage.removeItem("seatide-login-token");
	localStorage.removeItem("seatide-username");
}
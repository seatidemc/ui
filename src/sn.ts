import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const ENDPOINT = 'https://seatide.leviatan.cn';
const TRANSLATION: Dictionary = {
	'User not exists.': '用户不存在。',
	'Invalid action.': '无效操作。',
	'Username already exists.': '用户名已被使用。',
	'Unable to find instance id in database.': '实例不存在。',
	'No server ip found in database.': '服务器不存在。',
	"Permission denied. Details: Administrator's token is required.": "你的权限不足以执行此操作。"
};

export function post(url: string, data: any) {
	return new Promise<AxiosResponse<BackendResponse>>((re, rj) => {
		axios
			.post(ENDPOINT + url, qs.stringify(data))
			.then(r => re(r))
			.catch(e => rj(e));
	});
}

export function get(url: string) {
	return new Promise<AxiosResponse<BackendResponse>>((re, rj) => {
		axios
			.get(ENDPOINT + url)
			.then(r => re(r))
			.catch(e => rj(e));
	});
}

export function translate(str: string, withoutStop = false) {
	let result = TRANSLATION[str];
	if (Object.keys(TRANSLATION).includes(str)) return withoutStop ? result.slice(0, result.length - 1) : result;
	return 'TRANSLATION_NOT_FOUND';
}

export function setToken(token: string, username: string) {
	localStorage.setItem('seatide-login-token', token);
	localStorage.setItem('seatide-username', username);
}

export function delToken() {
	localStorage.removeItem('seatide-login-token');
	localStorage.removeItem('seatide-username');
}

export function getToken() {
	return localStorage.getItem('seatide-login-token') || '';
}

export function getTokenUsername() {
	return localStorage.getItem('seatide-username') || '';
}

export function checkLogin(username: string, token: string) {
	return new Promise<void>((r, j) => {
		post('/api/user/v1/auth', {
			type: 'check',
			username,
			token
		})
			.then(re => {
				if (re.data.status === 'ok') {
					r();
				} else {
					j();
				}
			})
			.catch(e => {
				console.warn(e);
				j();
			});
	});
}

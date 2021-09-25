import axios, { AxiosResponse } from 'axios';

const ENDPOINT = 'https://seatide.leviatan.cn';
const TRANSLATION: Dictionary = {
	'User not exists.': '用户不存在。',
	'Invalid action.': '无效操作。',
	'Username already exists.': '用户名已被使用。',
	'No instance id found in database.': '实例不存在。',
	'No server ip found in database.': '服务器不存在。',
	'Permission denied.': '你的权限不足以执行此操作。',
	'Not verified.': '密码不正确。',
	'Expired token.': '你的登陆凭证已失效。',
	'Failed to open tasks.': '无法执行既定任务。',
	'Failed to get InstanceId.': '无法获取实例 ID。',
	'No invocation history found.': '找不到部署执行记录。',
	'No invocation information found.': '找不到部署执行信息。',
	'There is already an instance recorded in the database.': '实例已存在或正在部署。'
};

export function post(url: string, data: any) {
	return new Promise<AxiosResponse<BackendResponse>>((re, rj) => {
		axios
			.post(ENDPOINT + url, data)
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

/**
 *  `withoutStop` 决定是否包含句号
 */ 
export function translate(str: string, withoutStop = false) {
	let result = TRANSLATION[str];
	if (Object.keys(TRANSLATION).includes(str)) return withoutStop ? result.slice(0, result.length - 1) : result;
	return str;
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

export function checkAdmin() {
	return new Promise<boolean>((r, j) => {
		post('/api/user/v1/auth', {
			type: 'checkAdmin',
			token: getToken()
		})
			.then(re => {
				if (re.data.status === 'ok') {
					r(re.data.data === true);
				} else {
					r(false);
				}
			})
			.catch(e => {
				console.warn(e);
				j();
			});
	});
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

export function isSM() {
	return window.innerWidth < 800;
}

/**
 * Vuetify 从大屏到小屏转换的 breakpoint 是 1200px，这时抽屉侧边栏等会发生变化，可使用此函数来判断。
 * @returns Less than MD Breakpoint?
 */
export function ltMdBreakpoint() {
	return window.innerWidth < 1200;
}

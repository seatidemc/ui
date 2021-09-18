interface BackendResponse {
	data: null | Object;
	status: 'ok' | 'ng' | 'http-error' | 'error' | null;
	msg?: string;
}

interface Dictionary {
	[prop: string]: any;
}

interface InstanceInfo {
	status: "loading" | "ok" | "ng";
	bandwidth: number;
	datadisk: InstanceDisk;
	systemdisk: InstanceDisk;
	type: string;
	zone: string;
}

interface InstanceDisk {
	size: number;
	type: string;
}

interface User {
	created_at: string;
	email: string;
	group: string;
	id: number;
	nickname: string | null;
	username: string
}
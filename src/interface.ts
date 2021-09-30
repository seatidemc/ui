interface BackendResponse {
	data: null | Object;
	status: 'ok' | 'ng' | 'http-error' | 'error' | null;
	msg?: string;
}

interface Dictionary {
	[prop: string]: any;
}

interface InstanceInfo {
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

interface ServerInformationFull {
	bestram: number,
	created: boolean,
	ip: string,
	maxPlayers: number,
	mods: {
		name: string,
		type: "dep" | "main" | "set" | "help",
		bg: string,
		desc: string
	}[],
	rawMods: {
		modId: string,
		modmarker: string
	}[],
	motd: string,
	since: string,
	term: string,
	version: string,
	online: boolean,
	onlinePlayers: number,
	onlinePlayersDetails: {
		id: string,
		name: string
	}[] | null
}
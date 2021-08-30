interface BackendResponse {
    data: null | Object,
    status: "ok" | "ng" | "http-error" | "error" | null,
    msg?: string
}

interface Dictionary {
    [prop: string]: any
}
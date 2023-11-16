import { e } from "unocss";

/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */
let configDefault: any = {
    showError: true,
    canEmpty: false,
    returnOrigin: false,
    withoutCheck: false,
    mock: false,
    timeout: 10000,
    mode: "cors",
    cache: "no-cache",
    cached: false,
    catchExpires: null,
    proxy: true,
    responseType: "json",
    // enableHttp2:true,
};

// 根据请求方式，url等生成请求key
const generateReqKey = (config: any) => {
    const { method, url, body, requestKey } = config;
    return requestKey || [method, url, new URLSearchParams(body)].join("&");
}

// 请求配置map
const pendingRequest = new Map();
// 添加请求map
const addPendingRequest = (config: any) => {
    const requestKey = generateReqKey(config);
    if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, config);
    }
}
// 移除请求map
export const removePendingRequest = (config: any, requestKey?: string) => {
    if (!requestKey) requestKey = generateReqKey(config);
    if (!config.requestKey) config.requestKey = requestKey;
    if (pendingRequest.has(requestKey)) {
        const cancelToken = config || pendingRequest.get(requestKey);
        if (cancelToken) {
            cancelToken.abortRequest = true;
            cancelToken.controller.abort();
        }
        pendingRequest.delete(requestKey);
    }
}

// 移除所有pending请求
export const removeAllPendingRequest = () => {
    pendingRequest.forEach((source) => {
        if (source) {
            removePendingRequest(source)
        }
    })
}

// 结果处理，fetch请求响应结果是promise，还得处理
async function resultReduction(response: any, request: any) {
    let res = '';
    switch (request.responseType) {
        case "json":
            res = await response.json();
            break;
        case "text":
            res = await response.text();
            break;
        case "blob":
            res = await response.blob();
            break;
        case "arrayBuffer":
            res = await response.arrayBuffer();
            break;
        default:
            res = await response?.json();
            break;
    }
    return await res;
}

async function useRequest(method: string, path: string, data: { [prop: string]: any }, config: any = {}): Promise<{ data: any, code: number }> {
    if (!useLoading().value) globalVar.$loadingBar.start(); useLoading().value = true;
    const token = useUserInfo().value.token;
    let configTemp = Object.assign(
        {
            headers: {
                // "Content-Type": config.formData
                //     ? "application/x-www-form-urlencoded" :
                //     config.fileUpload ? 'multipart/form-data;'
                //         : "application/json;charset=utf-8",
                // authorization: `Bearer ${token}`,
                Authorization: token
            },
        },
        { ...configDefault, ...config }
    );
    if (configTemp.isNotAuth) delete configTemp.headers['token'];
    if (configTemp.fileUpload) delete configTemp.headers["Content-Type"];
    if (!configTemp.fileUpload) {
        const paramsData = deepClone(data);
        for (const key in paramsData) {
            if (paramsData[key] === null) {
                delete paramsData[key];
            }
        }
        data = paramsData;
    }
    // path = (configTemp?.proxy ? process.env.VITE_baseUrl : '') + path;
    path = (configTemp?.proxy ? '/gateway' : '') + path;
    console.log('path: ', path);
    let myInit = {
        method,
        ...configTemp,
        body: config.fileUpload ? data : (config.formData ? new URLSearchParams(data) : data)
    };
    let params = '';
    if (method === 'GET') delete myInit.body
    if (data && (method === 'GET' || configTemp.joinUrl)) {
        // 对象转url参数
        params = (JSON.stringify(data) as any)?.replace(/:/g, '=')?.replace(/"/g, '')?.replace(/,/g, '&')?.match(/\{([^)]*)\}/)[1];
    }
    return new Promise((resolve, reject) => {
        $fetch(params ? `${path}${params ? "?" : ""}${params}` : path, myInit).then(async (res: any) => {
            if (res.code == 401 || res.code == 0) {
                globalVar.$loadingBar.finish()
                useLoading().value = false;
                if (res.code == 401) return navigateTo('/login')
                if (res.code == 0) resolve(res)
            }
            else globalVar.$message.error(res.message);
             
        }).catch(err => {
            useLoading().value = false;
            globalVar.$loadingBar.error()
            reject(err)
        })
    })
}
// get请求方法使用封装
export function get(path = '', data = {}, config = {}) {
    return useRequest('GET', path, data, config);
}

// post请求方法使用封装
export function post(path = '', data = {}, config = {}) {
    return useRequest('post', path, data, config);
}

// put请求方法使用封装
export function put(path = '', data = {}, config = {}) {
    return useRequest('PUT', path, data, config);
}

// delete请求方法使用封装
export function del(path = '', data = {}, config = {}) {
    return useRequest('DELETE', path, data, config);
}



// 延迟处理
export const delay = time => new Promise(resolve => setTimeout(resolve, time));

// url转换
const tranUrlFun = function(urlAddress = "", params) {
  let url = urlAddress;
  Object.keys(params).forEach(e => {
    let text = url.replace(`{${e}}`, data => {
      let text = params[e];
      delete params[e];
      return text;
    });
    url = text === urlAddress ? url : text;
  });
  return url;
};

export const setValue = function setValue(state, { payload }) {
  return {
    ...state,
    ...payload
  };
};

export default function getFetchData(fetchConfig) {
	const {
		netTool,
		netApi,
		converData,
		onGLNetStart,
		onGLNetFinall,
		onGLNetError,
		onGLNetCatch,
		onGLTimeOut,
		extendAttr,
		GLParams,
		GLTimeOut
	} = fetchConfig;
	return {
		namespace: 'fetch',
		state: {
			isShow: true, //true显示loading
			isNetError: false, // 是否网络出错
			isNetData: {} // 出错的单条网络数据
		},
		reducers: {
			setValue(state, {
				payload
			}) {
				return ({ ...state,
					...payload
				});
			},
		},
		effects: {
			* sendData({
				payload
			}, {
				call,
				select,
				race,
				take,
				put
			}) {
				try {
					// 这里保存最后需要合并的数据
					let ret = {};
					const keys = payload;
					for (let i = 0; i < keys.length; i++) {
						const obj = keys[i];
						const keyName = obj.target;
						const url = obj.url;
						const params = GLParams ? { ...obj.params,
							...GLParams
						} : obj.params;
						const timeOut = obj.timeOut || (GLTimeOut || 100000);
						const tranData = obj.tranData;
						const tranUrl = obj.transUrl;
						const method = obj.method || 'POST';
						const isOnlyNet = obj.isOnlyNet || false;
						const onError = obj.onError;
						const onCallBack = obj.onCallBack;
						const changeOrigin = obj.changeOrigin;
						const host = obj.host ? '/api' + obj.host : '/api';
						const converType = obj.converType
						if (url) {
							let urlAddress = netApi ? netApi[url] : url;
							urlAddress = tranUrl ? tranUrlFun(url, params) : urlAddress;
							// const retData = yield call(netTool[method],urlAddress,params)
							const {
								retData,
								timeout,
								cancel
							} = yield race({
								retData: call(netTool[method], host, urlAddress, params, changeOrigin),
								timeout: call(delay, timeOut || 10000),
								cancel: take('CANCEL_FETCH')
							});
							if (cancel) {
								break;
							}
							if (!timeout) {
								const netData = onGLNetStart && onGLNetStart({
									retData,
									...extendAttr
								});
								if (netData) {
									if (!isOnlyNet) {
										const oldState = yield select((state) => ({ ...state[keyName]
										}));
										if (tranData) {
											ret[keyName] = { ...oldState,
												...ret[keyName],
												...(tranData ? tranData(netData) : netData),
												// ...(converType ? converData[converType](netData, converType) : netData)
											};
										}else {
											ret[keyName] = { ...oldState,
												...ret[keyName],
												// ...(tranData ? tranData(netData) : netData),
												...(converType ? converData[converType](netData, converType) : netData)
											};
										}
										onCallBack && onCallBack({
											...obj,
											retData: { ...ret[keyName]},
											...extendAttr,
											params,
											timeOut,
											urlAddress
										});
									} else {
										onCallBack && onCallBack({
											...obj,
											// retData: (tranData ? tranData(netData) : netData),
											retData: (converType ? converData[converType](netData, converType) : netData),
											...extendAttr,
											params,
											timeOut,
											urlAddress
										});
									}
								} else {
									yield put({
										type: 'setValue',
										payload: {
											isShow: true,
											isNetError: true,
											isNetErrorData: obj
										}
									});
									onGLNetError && onGLNetError({ ...obj,
										...extendAttr,
										retData,
										params,
										timeOut,
										urlAddress
									});
									onError && onError({ ...obj,
										...extendAttr,
										retData,
										params,
										timeOut,
										urlAddress
									});
								}
								onGLNetFinall && onGLNetFinall({ ...obj,
									...extendAttr,
									retData,
									params,
									timeOut,
									urlAddress
								});
							} else {
								onGLTimeOut && onGLTimeOut({ ...obj,
									...extendAttr,
									retData,
									params,
									timeOut,
									urlAddress
								});
							}
						}
					}
					const retKeys = Object.keys(ret);
					if (retKeys.length > 0) {
						yield put({
							type: 'setValue',
							payload: {
								isShow: true,
								netError: false
							}
						});
						for (let i = 0; i < retKeys.length; i++) {
							yield put({
								type: `${retKeyName}/setValue`,
								payload: {
									isShow: true
								}
							});
							const obj = keys[i];
							const onEnd = obj.onEnd;
							const retKeyName = retKeys[i];
							const retObj = ret[retKeyName];
							yield put({
								type: `${retKeyName}/setValue`,
								payload: { ...retObj,
									isShow: false
								}
							});
							onEnd && onEnd();
						}
						yield put({
							type: 'setValue',
							payload: {
								isShow: false
							}
						});
					}
				} catch (error) {
					console.log('抛出异常',error);
					onGLNetCatch && onGLNetCatch({
						error,
						...extendAttr
					});
				}
			}
		}
	};
}

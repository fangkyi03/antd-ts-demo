//export const HOST_URL = 'http://192.167.5.180:8212';//'http://192.167.5.139:8002/'

export const POST = (host, url, params = {}, changeOrigin = true) => {
  return new Promise(resolve => {
    fetch(host + url, {
      body: JSON.stringify(params),
      credentials: "include",
      headers: { "Content-Type": "application/json;" },
      method: "POST"
    })
      .then(e => e.json())
      .then(e => {
        console.log('网络请求返回',e);
        resolve(e);
      })
      .catch(e => {
        resolve(e);
      });
  });
};

export const GET = (host, url, params = {}, changeOrigin = true) => {
  return new Promise(resolve => {
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(e => e.json())
      .then(e => {
        resolve(e);
      })
      .catch(e => {
        resolve(e);
      });
  });
};

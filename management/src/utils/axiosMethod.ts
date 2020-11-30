import server from '/@/http/api'

function http(params: any) {
  return new Promise((resolve, reject) => {
    server.service({
      method: params.method,
      url: params.url,
      params: params.data
    }).then(res => {
        resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

export default {
  http
}
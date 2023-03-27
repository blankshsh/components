const config = {
  api: '',
  data: {},
  loading: {},
  handle: {}
}

export const queryDict = function(dictCode) {
  return new Promise(resolve => {
    if (config.data[dictCode]) {
      resolve(config.data[dictCode])
    } else if (!config.loading[dictCode]) {
      config.loading[dictCode] = true
      axios.get(config.api, {
        params: {
          dictCode,
          v: new Date().getTime()
        }
      }).then(res => {
        const data = res.data.data
        config.data[dictCode] = data
        resolve(data)
        const handles = config.handle[dictCode] || []
        handles.forEach(handle => {
          handle(data)
        })
        config.handle[dictCode] = []
      })
    } else {
      const handle = config.handle[dictCode] || []
      handle.push(resolve)
      config.handle[dictCode] = handle
    }
  })
}

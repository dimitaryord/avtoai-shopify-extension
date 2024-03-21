export function connectWebSocket(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url)
  
      ws.onopen = () => {
        console.log('websocket connection established')
        resolve(ws)
      }
  
      ws.onerror = (error) => {
        console.error('websocket error:', error)
        reject(error)
      }
    })
  }
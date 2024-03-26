export function connectWebSocket(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url)
  
      ws.onopen = () => {
        console.log('connected to AVTO chat')
        resolve(ws)
      }
  
      ws.onerror = (error) => {
        console.error('AVTO chat error:', error)
        reject(error)
      }
    })
  }
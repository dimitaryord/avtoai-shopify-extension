export function adaptivePollingWithDelay({ fetch, finishedCheck = () => true, onCheck,
    onFinished, applyDelay, delay, subsequentDelay }) {
    return new Promise((resolve, reject) => {
        let isInitialCheck = true
        let data

        const poll = async () => {
            try {
                data = await fetch(data)

                if (finishedCheck(data)) {
                    onFinished(data)
                    resolve({ message: "Assistant finished successfully"})
                } else {
                    onCheck(data)
                    const isDelay = applyDelay(data, isInitialCheck)
                    setTimeout(poll, isDelay ? delay : subsequentDelay);
                    if(isDelay) isInitialCheck = false
                }
            } catch (error) {
                reject(error)
            }
        }

        setTimeout(poll, subsequentDelay)
    })
}

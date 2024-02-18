export default function adaptivePollingWithInitialDelay({openai, runId, threadId, initialDelay, subsequentDelay}) {
    return new Promise((resolve, reject) => {
      let isInitialCheck = true;
      let run
  
      const poll = async () => {
        try {
          run = await openai.beta.threads.runs.retrieve(threadId, isInitialCheck ? runId : run.id);
          const status = run.status;
          
          if (status === 'completed') {
            resolve('Assistant finished');
          } else {
            setTimeout(poll, isInitialCheck ? initialDelay : subsequentDelay);
            isInitialCheck = false;
          }
        } catch (error) {
          reject(error);
        }
      };
  
      setTimeout(poll, subsequentDelay);
    });
  }
  
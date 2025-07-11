// Utility for retrying async tasks with increasing delays

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn(); // Try the function
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }
      console.log(`Retry ${i + 1} failed. Retrying in ${delay}ms...`);
      await wait(delay); // Wait before next retry
      delay *= 2; // Exponential backoff
    }
  }
}

module.exports = retryWithBackoff;

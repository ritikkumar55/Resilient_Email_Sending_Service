// Very simple rate limiter: X emails per Y ms

class RateLimiter {
  constructor(limit, intervalMs) {
    this.limit = limit;
    this.intervalMs = intervalMs;
    this.timestamps = [];
  }

  canProceed() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.intervalMs);
    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;

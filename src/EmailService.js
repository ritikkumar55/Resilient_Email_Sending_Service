const retryWithBackoff = require('./utils/retryWithBackoff');
const RateLimiter = require('./utils/rateLimiter');

class EmailService {
  constructor(providers) {
    this.providers = providers;
    this.sentEmailIds = new Set();     // For idempotency
    this.statusLog = {};               // For tracking status
    this.rateLimiter = new RateLimiter(5, 60000); // 5 emails/min
  }

  async sendEmail(emailId, emailData) {
    // Idempotency check
    if (this.sentEmailIds.has(emailId)) {
      return { status: "duplicate", message: "Email already sent." };
    }

    // Rate limiting check
    if (!this.rateLimiter.canProceed()) {
      return { status: "rate_limited", message: "Rate limit exceeded. Try later." };
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        await retryWithBackoff(() => provider.send(emailData), 3, 1000);

        // Success
        this.sentEmailIds.add(emailId);
        this.statusLog[emailId] = { status: "success", provider: provider.constructor.name, attempts: i + 1 };
        return { status: "success", provider: provider.constructor.name };
      } catch (err) {
        console.log(`${provider.constructor.name} failed.`);
      }
    }

    // All providers failed
    this.statusLog[emailId] = { status: "failed", attempts: this.providers.length };
    return { status: "failed", message: "All providers failed." };
  }

  // View all email statuses
  getStatusLog() {
    return this.statusLog;
  }
}

module.exports = EmailService;

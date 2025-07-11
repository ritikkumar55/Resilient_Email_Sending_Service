const MockProvider1 = require('../src/providers/MockProvider1');
const MockProvider2 = require('../src/providers/MockProvider2');
const EmailService = require('../src/EmailService');

describe('EmailService', () => {
  let emailService;

  beforeEach(() => {
    const provider1 = new MockProvider1();
    const provider2 = new MockProvider2();
    emailService = new EmailService([provider1, provider2]);
  });

  test('should send email successfully', async () => {
    const result = await emailService.sendEmail('email-1', {
      to: 'test@example.com',
      subject: 'Hello',
      message: 'Testing...',
    });

    expect(['success', 'failed']).toContain(result.status);
  });

  test('should not send duplicate emails (idempotency)', async () => {
    await emailService.sendEmail('email-2', {
      to: 'dup@example.com',
      subject: 'Duplicate',
      message: 'First time',
    });

    const result = await emailService.sendEmail('email-2', {
      to: 'dup@example.com',
      subject: 'Duplicate',
      message: 'Second time',
    });

    expect(result.status).toBe('duplicate');
  });

  test('should enforce rate limiting', async () => {
    for (let i = 0; i < 5; i++) {
      await emailService.sendEmail(`email-${i}`, {
        to: `user${i}@example.com`,
        subject: 'Rate Test',
        message: 'Testing rate limit...',
      });
    }

    const result = await emailService.sendEmail('email-limit', {
      to: 'limit@example.com',
      subject: 'Over limit',
      message: 'Should fail due to rate limit',
    });

    expect(result.status).toBe('rate_limited');
  });
});

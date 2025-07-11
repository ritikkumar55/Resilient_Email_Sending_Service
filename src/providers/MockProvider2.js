// Another fake provider (fallback option)

class MockProvider2 {
  async send(emailData) {
    console.log("MockProvider2 attempting to send...");

    if (Math.random() < 0.7) {
      console.log("MockProvider2 succeeded");
      return { success: true };
    } else {
      throw new Error("MockProvider2 failed to send email");
    }
  }
}

module.exports = MockProvider2;

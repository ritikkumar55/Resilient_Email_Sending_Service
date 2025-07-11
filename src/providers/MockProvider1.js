// A mock email provider that randomly succeeds or fails

class MockProvider1 {
  async send(emailData) {
    console.log("MockProvider1 attempting to send...");
    
    // Simulate random failure
    if (Math.random() < 0.6) {
      // Success
      console.log("MockProvider1 succeeded");
      return { success: true };
    } else {
      // Failure
      throw new Error("MockProvider1 failed to send email");
    }
  }
}

module.exports = MockProvider1;

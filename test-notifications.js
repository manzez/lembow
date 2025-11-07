const fetch = require('node-fetch');

async function testNotificationService() {
  try {
    console.log('🧪 Testing Notification Service...\n');

    // Test notification service health
    console.log('1. Testing notification service health...');
    const healthResponse = await fetch('http://localhost:5001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Notification service health:', healthData);

    // Test sending a test email
    console.log('\n2. Testing email sending...');
    const emailResponse = await fetch('http://localhost:5001/test-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      }),
    });

    const emailData = await emailResponse.json();
    console.log('✅ Test email result:', emailData);

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNotificationService();
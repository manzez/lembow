// Test magic link authentication flow

async function testMagicLinkFlow() {
  const API_URL = 'http://localhost:4001'
  const testEmail = 'test@example.com'
  
  console.log('🧪 Testing Magic Link Authentication Flow\n')
  
  try {
    // Step 1: Request magic link
    console.log('1️⃣ Requesting magic link for:', testEmail)
    const magicLinkResponse = await fetch(`${API_URL}/auth/magic-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: testEmail })
    })
    
    const magicLinkResult = await magicLinkResponse.json()
    console.log('📧 Magic link response:', JSON.stringify(magicLinkResult, null, 2))
    
    if (!magicLinkResult.success || !magicLinkResult.token) {
      throw new Error('Failed to generate magic link')
    }
    
    // Step 2: Verify the token
    console.log('\n2️⃣ Verifying token:', magicLinkResult.token)
    const verifyResponse = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: magicLinkResult.token })
    })
    
    const verifyResult = await verifyResponse.json()
    console.log('✅ Verify response:', JSON.stringify(verifyResult, null, 2))
    
    if (verifyResult.success) {
      console.log('\n🎉 Magic Link Authentication Test: SUCCESS!')
      console.log(`🔗 Magic Link URL: ${magicLinkResult.magicLink}`)
      console.log(`🎯 Frontend URL: http://localhost:3005/auth/verify?token=${magicLinkResult.token}`)
    } else {
      throw new Error('Token verification failed')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testMagicLinkFlow()
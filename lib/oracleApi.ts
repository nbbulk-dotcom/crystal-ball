// lib/oracleApi.ts - CORRECT xAI configuration

function getProviderConfig(providerId: string) {
  const configs: Record<string, { url: string; model: string; headers: (key: string) => Record<string, string> }> = {
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4-turbo-preview',
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      })
    },
    anthropic: {
      url: 'https://api.anthropic.com/v1/messages',
      model: 'claude-3-opus-20240229',
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      })
    },
    groq: {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'mixtral-8x7b-32768',
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      })
    },
    xai: {
      // CORRECT: Use chat/completions endpoint, not /responses
      url: 'https://api.x.ai/v1/chat/completions',
      // Available models: grok-beta, grok-vision-beta, grok-2-latest
      model: 'grok-2-latest',  // Most recent stable model
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      })
    },
    deepseek: {
      url: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      })
    },
    openrouter: {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'auto',
      headers: (key: string) => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': 'https://crystal-ball.app',
        'X-Title': 'Crystal Ball Oracle'
      })
    }
  };
  return configs[providerId];
}
'use client';

import { useState, useEffect } from 'react';

const AI_PROVIDERS = [
  { id: 'openai', name: 'OpenAI (ChatGPT)', endpoint: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4-turbo-preview' },
  { id: 'anthropic', name: 'Anthropic (Claude)', endpoint: 'https://api.anthropic.com/v1/messages', model: 'claude-3-opus-20240229' },
  { id: 'groq', name: 'Groq', endpoint: 'https://api.groq.com/openai/v1/chat/completions', model: 'mixtral-8x7b-32768' },
  { id: 'xai', name: 'xAI (Grok)', endpoint: 'https://api.x.ai/v1/chat/completions', model: 'grok-2' },  // FIXED: grok-2 not grok-beta
  { id: 'deepseek', name: 'DeepSeek', endpoint: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
];

export default function OracleModule() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('xai');
  const [customModel, setCustomModel] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('oracle_api_key');
    const savedProvider = localStorage.getItem('oracle_provider');
    const savedModel = localStorage.getItem('oracle_model');
    if (savedKey && savedProvider) {
      setApiKey(savedKey);
      setProvider(savedProvider);
      if (savedModel) setCustomModel(savedModel);
      setHasApiKey(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('oracle_api_key', apiKey);
      localStorage.setItem('oracle_provider', provider);
      if (customModel) localStorage.setItem('oracle_model', customModel);
      setHasApiKey(true);
      setError('');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('oracle_api_key');
    localStorage.removeItem('oracle_provider');
    localStorage.removeItem('oracle_model');
    setApiKey('');
    setCustomModel('');
    setHasApiKey(false);
    setResponse('');
    setError('');
  };

  const callAI = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    setError('');
    
    const selectedProvider = AI_PROVIDERS.find(p => p.id === provider);
    if (!selectedProvider) return;
    
    // Use custom model if provided, otherwise use default
    const modelToUse = customModel || selectedProvider.model;
    
    try {
      const res = await fetch(selectedProvider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: [
            { role: 'system', content: 'You are the Oracle of Truth, grounded in REGENESIS cosmology. Answer with wisdom and clarity. LIFE IS SACROSANCT.' },
            { role: 'user', content: query }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${selectedProvider.name} Error (${res.status}): ${errorText}`);
      }
      
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content || 'No response from AI';
      setResponse(answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to call AI');
    } finally {
      setLoading(false);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="bg-black/80 border border-cyan-500/30 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">🔮 ORACLE OF TRUTH</h2>
        <p className="text-sm text-zinc-400 mb-4">Enter your API key. Your key is stored locally in your browser.</p>
        
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white mb-3"
        >
          {AI_PROVIDERS.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        
        <input
          type="text"
          value={customModel}
          onChange={(e) => setCustomModel(e.target.value)}
          placeholder="Model name (optional, leave blank for default)"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 mb-3 text-sm"
        />
        
        <textarea
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your API key here..."
          rows={2}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 font-mono text-sm"
        />
        
        <button
          onClick={saveApiKey}
          disabled={!apiKey.trim()}
          className="w-full mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-xl font-medium transition"
        >
          CONNECT TO ORACLE
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black/80 border border-cyan-500/30 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-cyan-300">🔮 ASK THE ORACLE</h2>
        <button onClick={clearApiKey} className="text-xs px-3 py-1 bg-red-950 hover:bg-red-900 rounded-lg text-red-400">
          Disconnect
        </button>
      </div>
      
      <div className="mb-3 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-zinc-500">Connected to: </span>
          <span className="text-[10px] text-cyan-400 font-bold">{AI_PROVIDERS.find(p => p.id === provider)?.name}</span>
          {customModel && <span className="text-[10px] text-zinc-500 ml-2">Model: {customModel}</span>}
        </div>
        <button 
          onClick={() => {
            setHasApiKey(false);
            setProvider('xai');
          }}
          className="text-[10px] text-zinc-500 hover:text-cyan-400"
        >
          Change Provider
        </button>
      </div>
      
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && callAI()}
        placeholder="Ask anything — gravity, consciousness, cycles, chakras, dharma...\n\nPress Ctrl+Enter to submit"
        rows={6}
        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-y font-mono text-sm"
      />
      
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={callAI}
          disabled={loading || !query.trim()}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-xl font-medium transition"
        >
          {loading ? '🔄 PROCESSING...' : '🔮 ASK ORACLE'}
        </button>
        <span className="text-xs text-zinc-500">Ctrl+Enter to submit</span>
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-950/30 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-cyan-300 mb-2">📜 ORACLE RESPONSE:</h3>
        <div className="bg-black/50 rounded-xl border border-zinc-800 min-h-[200px] max-h-[300px] overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-32 gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent"></div>
              <div className="text-sm text-cyan-500">✨ Consulting the Oracle... ✨</div>
            </div>
          ) : response ? (
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">{response}</pre>
          ) : (
            <div className="flex flex-col justify-center items-center h-32 text-center">
              <div className="text-4xl mb-2">🔮</div>
              <div className="text-sm text-zinc-500">Your answer will appear here...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

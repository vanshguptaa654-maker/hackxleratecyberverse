// server.js
require('dotenv').config(); // Absolute first line to initialize environment variables safely

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

// QR Decoder Requirements
const multer = require('multer');
const jsQR = require('jsqr');
const { Canvas, Image } = require('canvas');

const app = express();

// Pull configuration from private process environment with fallback ports
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware architecture
app.use(cors());
app.use(express.json());

// Bind the production static serving engine directly to the /public folder layout
app.use(express.static(path.join(__dirname, 'public')));

// Multer Memory Storage Configuration for QR Code Image Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('qrImage');

// 1. Initialize the official Google Gen AI SDK
if (!GEMINI_API_KEY) {
  console.error('❌ CRITICAL ENGINE FAILURE: process.env.GEMINI_API_KEY is missing.');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 2. Database Connection Engine Initialization
if (!MONGO_URI) {
  console.error('❌ CRITICAL ENGINE FAILURE: process.env.MONGO_URI is missing or undefined.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connection to secure MongoDB Atlas Cluster established successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 3. Data Model Document Schemas
const ThreatLogSchema = new mongoose.Schema({
  type: { type: String, enum: ['url', 'text', 'qr (url)', 'qr (text)'], required: true },
  inputData: { type: String, required: true },
  score: { type: Number, required: true },
  verdict: { type: String, enum: ['Safe', 'Suspicious', 'Dangerous'], required: true },
  indicators: [String],
  aiExplanation: { type: String },
  safetyAdvice: { type: String },
  fallbackUsed: { type: Boolean, default: false },
  resolvedModel: { type: String },
  scannedAt: { type: Date, default: Date.now }
});

const ThreatLog = mongoose.model('ThreatLog', ThreatLogSchema);

// 4. System Heuristic Evaluation Metrics Logic
function analyzeURLHeuristics(urlStr) {
  let score = 0;
  const indicators = [];

  try {
    let formattedUrl = urlStr.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'http://' + formattedUrl;
    }
    const parsed = new URL(formattedUrl);
    const hostname = parsed.hostname.toLowerCase();

    if (parsed.protocol !== 'https:') {
      score += 20;
      indicators.push('Unencrypted Protocol Configuration (HTTP detected)');
    }
    
    const suspiciousKeywords = ['login', 'verify', 'secure', 'bank', 'update', 'free', 'wallet', 'paytm', 'paypal', 'kyc'];
    suspiciousKeywords.forEach(word => {
      if (hostname.includes(word)) {
        score += 25;
        indicators.push(`Suspicious keyword structural match: "${word}"`);
      }
    });

    const rareTLDs = ['.xyz', '.top', '.club', '.info', '.biz', '.cc', '.live'];
    rareTLDs.forEach(tld => {
      if (hostname.endsWith(tld)) {
        score += 20;
        indicators.push(`High-risk top level domain routing registry (${tld})`);
      }
    });

    if ((hostname.match(/\./g) || []).length > 2) {
      score += 15;
      indicators.push('Excessive nested subdomains path structure');
    }

    if (/^[0-9.]+$/.test(hostname)) {
      score += 30;
      indicators.push('Host disguised explicitly as raw IP Address pointer');
    }

  } catch (e) {
    score = 40;
    indicators.push('Malformed URL structure / Structural Parsing Error');
  }

  return { score: Math.min(score, 100), indicators };
}

function analyzeTextHeuristics(text) {
  let score = 0;
  const indicators = [];
  const content = text.toLowerCase();

  const urgencyRegex = /(immediately|blocked|suspended|action required|urgent|unauthorized|restricted|24 hours)/g;
  const financialRegex = /(lottery|gift card|crypto|won|inherited|cash bonus|selected|claim)/g;
  const credentialsRegex = /(password|pin|otp|ssn|social security|cvv|verify account)/g;

  if (urgencyRegex.test(content)) {
    score += 30;
    indicators.push('Urgent language or panic engineering indicators');
  }
  if (financialRegex.test(content)) {
    score += 25;
    indicators.push('Unsolicited financial bait or artificial prize offer');
  }
  if (credentialsRegex.test(content)) {
    score += 35;
    indicators.push('Explicit data harvesting request (OTP/Password/PIN)');
  }
  if (/(http|https|www\.)/.test(content)) {
    score += 10;
    indicators.push('Contains inline hyperlink references');
  }

  return { score: Math.min(score, 100), indicators };
}

/**
 * Image Buffer QR Decoding Engine using Canvas + jsQR
 */
function decodeQRFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = new Canvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        resolve(code.data);
      } else {
        reject(new Error('Could not read or locate a valid QR code symbol in this image.'));
      }
    };
    img.onerror = (err) => reject(new Error('Failed to process image file metrics layout.'));
    img.src = buffer;
  });
}

/**
 * Robust Fallback Model Routing Execution Engine
 * Cycles down model hierarchies to defend against 429 Rate Limits / Quota exhaustion
 */
async function generateContentWithFallback(prompt, modelIndex = 0) {
  const modelChain = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2-flash',
    'gemini-2-flash-lite'
  ];

  if (modelIndex >= modelChain.length) {
    throw new Error('All primary and fallback AI model variants in the configuration pipeline failed.');
  }

  const activeModel = modelChain[modelIndex];
  console.log(`🤖 Attempting structural query compilation on: [${activeModel}]`);

  try {
    const response = await ai.models.generateContent({
      model: activeModel,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text);
    return {
      ...parsedData,
      resolvedModel: activeModel,
      fallbackUsed: modelIndex > 0
    };

  } catch (error) {
    console.warn(`⚠️ Model failover triggered! [${activeModel}] failed with error: ${error.message}`);
    return await generateContentWithFallback(prompt, modelIndex + 1);
  }
}

// AI-Assisted Assessment Helper Engine Wrapper
async function getAIAnalysis(type, inputData, localScore, localIndicators) {
  const prompt = `
    You are an expert cybersecurity threat intelligence analyst.
    Analyze the following asset data for phishing, social engineering, malicious intent, or scam characteristics.
    
    Asset Classification Type: ${type.toUpperCase()}
    Target Input Data under test: "${inputData}"
    
    Our local static heuristic engine triggered these flags: [${localIndicators.join(', ')}]
    Static baseline risk score contribution calculation: ${localScore}/100

    Evaluate the input context against zero-day vulnerabilities. Adjust the final threat score dynamically if necessary.
    
    CRITICAL: You must return your response using the following JSON schema strictly:
    {
      "finalScore": number (0 to 100),
      "verdict": "Safe" | "Suspicious" | "Dangerous",
      "aiExplanation": "A precise synthesis explaining the structural or conversational threat profiles",
      "safetyAdvice": "Actionable defense tips instructing the user on what specific actions to take next"
    }
  `;

  try {
    return await generateContentWithFallback(prompt, 0);
  } catch (err) {
    console.error('🚨 TOTAL CRITICAL FAILOVER: All AI options are spent. Defaulting to local safety net rules.', err.message);
    
    let verdict = 'Safe';
    if (localScore > 30) verdict = 'Suspicious';
    if (localScore > 60) verdict = 'Dangerous';

    return {
      finalScore: localScore,
      verdict: verdict,
      aiExplanation: "Local evaluation heuristic emergency mode active. All live network AI layers are currently unresponsive.",
      safetyAdvice: "Exercise complete isolation procedures. Do not interact with unverified structures.",
      resolvedModel: "Local Heuristics Engine (Failover)",
      fallbackUsed: true
    };
  }
}

// 5. API Request Routes
app.post('/api/scan/url', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL input parameter is required' });

  const localAnalysis = analyzeURLHeuristics(url);
  const aiResult = await getAIAnalysis('url', url, localAnalysis.score, localAnalysis.indicators);

  try {
    const log = await ThreatLog.create({
      type: 'url',
      inputData: url,
      score: aiResult.finalScore,
      verdict: aiResult.verdict,
      indicators: localAnalysis.indicators,
      aiExplanation: aiResult.aiExplanation,
      safetyAdvice: aiResult.safetyAdvice,
      fallbackUsed: aiResult.fallbackUsed,
      resolvedModel: aiResult.resolvedModel
    });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database logging operational failure error' });
  }
});

app.post('/api/scan/text', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text content string parameter is required' });

  const localAnalysis = analyzeTextHeuristics(text);
  const aiResult = await getAIAnalysis('text', text, localAnalysis.score, localAnalysis.indicators);

  try {
    const log = await ThreatLog.create({
      type: 'text',
      inputData: text,
      score: aiResult.finalScore,
      verdict: aiResult.verdict,
      indicators: localAnalysis.indicators,
      aiExplanation: aiResult.aiExplanation,
      safetyAdvice: aiResult.safetyAdvice,
      fallbackUsed: aiResult.fallbackUsed,
      resolvedModel: aiResult.resolvedModel
    });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database logging operational failure error' });
  }
});

/**
 * Advanced QR Vector Analysis Endpoint
 */
app.post('/api/scan/qr', upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a valid QR code image file.' });
  }

  try {
    // 1. Read pixels and decode text value from QR Matrix
    const decodedPayload = await decodeQRFromBuffer(req.file.buffer);
    console.log(`🔍 QR Engine Decoded Content: "${decodedPayload}"`);

    // 2. Classify payload type on-the-fly to execute matching local heuristics
    let localAnalysis;
    let computedType = 'text';

    if (/^https?:\/\//i.test(decodedPayload.trim()) || decodedPayload.trim().includes('.')) {
      computedType = 'url';
      localAnalysis = analyzeURLHeuristics(decodedPayload);
    } else {
      localAnalysis = analyzeTextHeuristics(decodedPayload);
    }

    // 3. Inject visual extraction anchor tag & query the cascade model matrix
    const customIndicators = [...localAnalysis.indicators, "Extracted securely via internal visual QR matrix decoder"];
    const aiResult = await getAIAnalysis(computedType, decodedPayload, localAnalysis.score, customIndicators);

    // 4. Save to central MongoDB logs database
    const log = await ThreatLog.create({
      type: `qr (${computedType})`,
      inputData: decodedPayload,
      score: aiResult.finalScore,
      verdict: aiResult.verdict,
      indicators: customIndicators,
      aiExplanation: aiResult.aiExplanation,
      safetyAdvice: aiResult.safetyAdvice,
      fallbackUsed: aiResult.fallbackUsed,
      resolvedModel: aiResult.resolvedModel
    });

    res.json(log);

  } catch (err) {
    console.error('❌ QR Engine Processing breakdown:', err.message);
    res.status(500).json({ error: err.message || 'Operational matrix extraction processing failure.' });
  }
});

app.get('/api/logs', async (req, res) => {
  try {
    const logs = await ThreatLog.find().sort({ scannedAt: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve historical logs' });
  }
});

// 6. BULLETPROOF ROUTING LAYER: Resolves catch-all paths seamlessly on Express v5
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fire up server lifecycle
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Automated AI Cascade Engine is running seamlessly!`);
  console.log(`🔗 Target Dashboard: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
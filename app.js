const NETWORK_API_BASE = window.location.origin;

window.addEventListener('DOMContentLoaded', () => {
    // Fire up structural vector lucide icons mapping engines
    lucide.createIcons();
    pullHistoricalTelemetryStream();
    
    // Initialize continuous vector pipeline radar scanning element
    initializeVectorRadarAnimation();
});

/**
 * Radar Sweep Animation 
 * Targets the canvas/circular visual inside the Select Vector Pipeline header
 */
function initializeVectorRadarAnimation() {
    // Looks directly for the updated radar SVG frame container block
    const radarContainer = document.querySelector('.radar-container');
    
    if (radarContainer) {
        // Toggle animation active class hooks on our optimized vector nodes
        const sweeperLine = radarContainer.querySelector('.radar-sweeper-pivot');
        if (sweeperLine && !sweeperLine.classList.contains('radar-sweeper-pivot')) {
            sweeperLine.classList.add('radar-sweeper-pivot');
        }
    }
}

/* 4-Channel Input Visibility Tab Switcher Logic */
function switchPipelineTab(modeSelection) {
    document.querySelectorAll('.pipeline-form').forEach(el => el.classList.add('hidden'));
    
    const operationalModes = ['url', 'sms', 'email', 'qr'];
    operationalModes.forEach(mode => {
        const buttonTarget = document.getElementById(`pipeline-tab-${mode}`);
        if (mode === modeSelection) {
            buttonTarget.className = "py-2.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all text-cyan-400 bg-slate-950 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]";
        } else {
            buttonTarget.className = "py-2.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all text-slate-500 hover:text-slate-300";
        }
    });

    document.getElementById(`pipeline-form-${modeSelection}`).classList.remove('hidden');
}

/* Attachment file text update bindings */
function handleQRFileLabelBinding(inputSource) {
    const labelNode = document.getElementById('file-label-text');
    const boundingIconBox = document.getElementById('file-icon-box');
    if (inputSource.files && inputSource.files[0]) {
        boundingIconBox.className = "p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 mb-2 shadow-[0_0_10px_rgba(6,182,212,0.1)]";
        labelNode.textContent = `TARGET ARTIFACT: ${inputSource.files[0].name}`;
    }
}

/* Helper function to attach horizontal scanner bar to the Active Input Console */
function createInputConsoleScanBeam(formId) {
    const matchingForm = document.getElementById(formId);
    if (!matchingForm) return null;

    // Find the closest parent console card with the unique glow-cyan panel identity wrapper
    const inputConsoleCard = matchingForm.closest('.glow-cyan');
    if (inputConsoleCard) {
        // Ensure standard layout stacking context positions correctly
        if (!inputConsoleCard.classList.contains('relative')) {
            inputConsoleCard.classList.add('relative');
        }
        
        // Wipe away stale beams if still existing
        const staleBeam = inputConsoleCard.querySelector('.input-scan-beam');
        if (staleBeam) staleBeam.remove();

        // Inject the active scanning element node
        const scanBeam = document.createElement('div');
        scanBeam.className = 'input-scan-beam';
        inputConsoleCard.appendChild(scanBeam);
        return scanBeam;
    }
    return null;
}

/* Terminal Simulation Execution Loop Logic */
function runShellProgressSimulation(onCompleteCallback) {
    const screenBuffer = document.getElementById('terminal-stream-node');
    
    // Find or locate parent terminal wrapper block to map scanning line visual over
    const terminalWrapper = screenBuffer ? screenBuffer.closest('#terminal-container-block') : null;
    
    if (terminalWrapper) {
        // Remove old scanning beam if still processing
        const trackingLine = terminalWrapper.querySelector('.terminal-scan-beam');
        if (trackingLine) trackingLine.remove();

        // Inject dynamic scan analyzer bar
        const scanLine = document.createElement('div');
        scanLine.className = 'terminal-scan-beam';
        terminalWrapper.appendChild(scanLine);
    }

    if (screenBuffer) {
        screenBuffer.innerHTML = '';
    }

    const logsArray = [
        "Intercepting submission metadata profiles...",
        "Decoding vector string matrix algorithms...",
        "Deploying signature mapping arrays against 2.4M items...",
        "Running heuristic language parsing models internally...",
        "Correlating indicators against active zero-day blocks...",
        "Compiling multi-lane behavioral matrix calculations...",
        "Platform telemetry assessment process finalized successfully."
    ];

    let lineIndex = 0;
    function writeOutputLineStep() {
        if (lineIndex < logsArray.length) {
            if (screenBuffer) {
                const rowLine = document.createElement('div');
                // Use structural clearing classes to prevent height clipping errors
                rowLine.className = lineIndex === logsArray.length - 1 
                    ? "text-cyan-400 font-mono block clear-both border-b border-cyan-950/20 pb-1 mt-0.5" 
                    : "text-slate-500 font-mono block clear-both";
                rowLine.textContent = `[METRIC] ${logsArray[lineIndex]}`;
                screenBuffer.appendChild(rowLine);
                screenBuffer.scrollTop = screenBuffer.scrollHeight;
            }
            lineIndex++;
            setTimeout(writeOutputLineStep, 150);
        } else {
            // Processing complete: Clear structural scanning bar overlay safely
            if (terminalWrapper) {
                const beamElement = terminalWrapper.querySelector('.terminal-scan-beam');
                if (beamElement) beamElement.remove();
            }
            if (onCompleteCallback) onCompleteCallback();
        }
    }
    writeOutputLineStep();
}

/* Hydrate Investigation Forensics Card Block Data */
function hydrateForensicsWorkspaceCard(data) {
    const workspaceCard = document.getElementById('telemetry-output-container');
    const configurationBanner = document.getElementById('banner-verdict-wrapper');
    const scoreTextLabel = document.getElementById('txt-threat-score');
    const badgeVerdictLabel = document.getElementById('badge-threat-verdict');
    const textTitleLabel = document.getElementById('txt-threat-title');
    const textExplanationParagraph = document.getElementById('txt-threat-explanation');
    const remediationPlaybookParagraph = document.getElementById('txt-threat-advice');
    const indicatorsListContainer = document.getElementById('list-threat-indicators');
    const classificationBadge = document.getElementById('txt-vector-classification');
    const donutMetricCircle = document.getElementById('donut-metric-circle');

    const footInputText = document.getElementById('txt-meta-input');
    const footModelText = document.getElementById('txt-meta-model');
    const footFallbackBadge = document.getElementById('badge-meta-fallback');

    if (!workspaceCard) return;
    workspaceCard.classList.remove('hidden');

    // Wipe old forensic banner scanning lasers before rendering updates
    if (configurationBanner) {
        const structuralStaleBeam = configurationBanner.querySelector('.result-scan-beam');
        if (structuralStaleBeam) structuralStaleBeam.remove();
        
        // Append laser scanner trace onto findings summary layout
        const forensicLaser = document.createElement('div');
        forensicLaser.className = 'result-scan-beam';
        configurationBanner.appendChild(forensicLaser);
    }

    // Process SVG Donut Chart Stroke Fill Ratios Dynamically
    if (donutMetricCircle) {
        const riskPercentageValue = Math.min(Math.max(parseInt(data.score) || 0, 0), 100);
        const circleRadiusValue = parseFloat(donutMetricCircle.getAttribute('r')) || 40;
        const completeCircumference = 2 * Math.PI * circleRadiusValue; // 251.32
        
        donutMetricCircle.style.strokeDasharray = `${completeCircumference}`;
        const relativeDashOffset = completeCircumference - (riskPercentageValue / 100) * completeCircumference;
        donutMetricCircle.style.strokeDashoffset = relativeDashOffset;
    }

    // Map classifications dynamically to UI text banner
    if (classificationBadge) {
        let cleanTypeString = (data.type || "UNKNOWN").toUpperCase();
        if (cleanTypeString === "URL") cleanTypeString = "PHISHING LURE";
        if (cleanTypeString === "SMS") cleanTypeString = "SMISHING PROFILE";
        if (cleanTypeString === "QR") cleanTypeString = "QR QUISHING CODE";
        classificationBadge.textContent = `CLASSIFICATION: ${cleanTypeString}`;
    }

    if (configurationBanner && badgeVerdictLabel && scoreTextLabel && textTitleLabel) {
        if (data.verdict === 'Dangerous') {
            configurationBanner.className = "border-red-500/20 bg-red-950/10 text-red-400 rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center glow-red relative overflow-hidden w-full";
            badgeVerdictLabel.className = "text-[9px] font-black heading-font tracking-widest px-1.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400 uppercase mt-0.5";
            scoreTextLabel.className = "heading-font text-3xl sm:text-4xl font-black tracking-tighter text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]";
            textTitleLabel.className = "heading-font text-base sm:text-lg font-extrabold tracking-wide text-red-400 uppercase truncate";
            if (classificationBadge) classificationBadge.className = "text-[9px] font-black tracking-widest heading-font bg-slate-950 px-2.5 py-1 rounded-md border border-red-900/30 text-red-400 w-full max-w-[200px] truncate";
        } else if (data.verdict === 'Suspicious') {
            configurationBanner.className = "border-amber-500/20 bg-amber-950/10 text-amber-400 rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center glow-amber relative overflow-hidden w-full";
            badgeVerdictLabel.className = "text-[9px] font-black heading-font tracking-widest px-1.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 uppercase mt-0.5";
            scoreTextLabel.className = "heading-font text-3xl sm:text-4xl font-black tracking-tighter text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]";
            textTitleLabel.className = "heading-font text-base sm:text-lg font-extrabold tracking-wide text-amber-400 uppercase truncate";
            if (classificationBadge) classificationBadge.className = "text-[9px] font-black tracking-widest heading-font bg-slate-950 px-2.5 py-1 rounded-md border border-amber-900/30 text-amber-400 w-full max-w-[200px] truncate";
        } else {
            configurationBanner.className = "border-cyan-500/20 bg-cyan-950/10 text-cyan-400 rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center glow-cyan relative overflow-hidden w-full";
            badgeVerdictLabel.className = "text-[9px] font-black heading-font tracking-widest px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase mt-0.5";
            scoreTextLabel.className = "heading-font text-3xl sm:text-4xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]";
            textTitleLabel.className = "heading-font text-base sm:text-lg font-extrabold tracking-wide text-cyan-400 uppercase truncate";
            if (classificationBadge) classificationBadge.className = "text-[9px] font-black tracking-widest heading-font bg-slate-950 px-2.5 py-1 rounded-md border border-slate-900 text-cyan-400 w-full max-w-[200px] truncate";
        }
    }

    if (scoreTextLabel) scoreTextLabel.textContent = `${data.score}%`;
    if (badgeVerdictLabel) badgeVerdictLabel.textContent = data.verdict;
    if (textTitleLabel) textTitleLabel.textContent = `${data.type.toUpperCase()} // RISK_VERDICT_ISOLATION`;
    if (textExplanationParagraph) textExplanationParagraph.textContent = data.aiExplanation || "Forensic analyzer run error encountered.";
    if (remediationPlaybookParagraph) remediationPlaybookParagraph.textContent = data.safetyAdvice || "No defensive standard actions outputted.";

    if (footInputText) footInputText.textContent = data.inputData;
    if (footModelText) footModelText.textContent = (data.resolvedModel || "UNKNOWN").toUpperCase();

    if (footFallbackBadge) {
        if (data.fallbackUsed) footFallbackBadge.classList.remove('hidden');
        else footFallbackBadge.classList.add('hidden');
    }

    if (indicatorsListContainer) {
        indicatorsListContainer.innerHTML = '';
        if (data.indicators && data.indicators.length > 0) {
            data.indicators.forEach(ind => {
                const listItem = document.createElement('li');
                listItem.className = "flex items-start gap-2 bg-slate-900/30 border border-slate-900 p-2.5 rounded-xl text-left";
                listItem.innerHTML = `<span class="text-red-500 font-bold select-none">&gt;</span> <span class="text-slate-300">${ind}</span>`;
                indicatorsListContainer.appendChild(listItem);
            });
        } else {
            indicatorsListContainer.innerHTML = `<div class="text-[11px] text-slate-600 italic p-1">No anomalous structural parameters triggered.</div>`;
        }
    }

    lucide.createIcons();
    workspaceCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Event Routing Forms Observers System */
const formUrl = document.getElementById('pipeline-form-url');
if (formUrl) {
    formUrl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const stringValue = document.getElementById('payload-input-url').value;
        
        // Start Input Console card scanning beam loop animation
        const consoleBeamElement = createInputConsoleScanBeam('pipeline-form-url');

        runShellProgressSimulation(async () => {
            try {
                const networkCall = await fetch(`${NETWORK_API_BASE}/api/scan/url`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: stringValue })
                });
                const responseData = await networkCall.json();
                if (!responseData.error) { 
                    hydrateForensicsWorkspaceCard(responseData); 
                    pullHistoricalTelemetryStream(); 
                }
            } catch (err) { 
                console.error("Link transaction processing lines failure.", err); 
            } finally {
                // Clear the console tracking scan beam element when request finishes
                if (consoleBeamElement) consoleBeamElement.remove();
            }
        });
    });
}

const formSms = document.getElementById('pipeline-form-sms');
if (formSms) {
    formSms.addEventListener('submit', async (e) => {
        e.preventDefault();
        const stringValue = document.getElementById('payload-input-sms').value;
        
        // Start Input Console card scanning beam loop animation
        const consoleBeamElement = createInputConsoleScanBeam('pipeline-form-sms');

        runShellProgressSimulation(async () => {
            try {
                const networkCall = await fetch(`${NETWORK_API_BASE}/api/scan/text`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: stringValue })
                });
                const responseData = await networkCall.json();
                if (!responseData.error) { 
                    responseData.type = "sms"; 
                    hydrateForensicsWorkspaceCard(responseData); 
                    pullHistoricalTelemetryStream(); 
                }
            } catch (err) { 
                console.error("SMS content ingestion pipeline failure.", err); 
            } finally {
                // Clear the console tracking scan beam element when request finishes
                if (consoleBeamElement) consoleBeamElement.remove();
            }
        });
    });
}

const formEmail = document.getElementById('pipeline-form-email');
if (formEmail) {
    formEmail.addEventListener('submit', async (e) => {
        e.preventDefault();
        const stringValue = document.getElementById('payload-input-email').value;
        
        // Start Input Console card scanning beam loop animation
        const consoleBeamElement = createInputConsoleScanBeam('pipeline-form-email');

        runShellProgressSimulation(async () => {
            try {
                const networkCall = await fetch(`${NETWORK_API_BASE}/api/scan/text`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: stringValue })
                });
                const responseData = await networkCall.json();
                if (!responseData.error) { 
                    responseData.type = "email"; 
                    hydrateForensicsWorkspaceCard(responseData); 
                    pullHistoricalTelemetryStream(); 
                }
            } catch (err) { 
                console.error("Email layout semantic translation failure.", err); 
            } finally {
                // Clear the console tracking scan beam element when request finishes
                if (consoleBeamElement) consoleBeamElement.remove();
            }
        });
    });
}

const formQr = document.getElementById('pipeline-form-qr');
if (formQr) {
    formQr.addEventListener('submit', async (e) => {
        e.preventDefault();
        const attachedFileObject = document.getElementById('file-input-qr').files[0];
        if (!attachedFileObject) return;

        const packagingForm = new FormData();
        packagingForm.append('qrImage', attachedFileObject);

        // Start Input Console card scanning beam loop animation
        const consoleBeamElement = createInputConsoleScanBeam('pipeline-form-qr');

        runShellProgressSimulation(async () => {
            try {
                const networkCall = await fetch(`${NETWORK_API_BASE}/api/scan/qr`, {
                    method: 'POST',
                    body: packagingForm
                });
                const responseData = await networkCall.json();
                if (responseData.error) alert(`Visual extraction loop stopped: ${responseData.error}`);
                else { 
                    hydrateForensicsWorkspaceCard(responseData); 
                    pullHistoricalTelemetryStream(); 
                }
            } catch (err) { 
                console.error("Multipart binary transport stream error.", err); 
            } finally {
                // Clear the console tracking scan beam element when request finishes
                if (consoleBeamElement) consoleBeamElement.remove();
            }
        });
    });
}

/* Pull Historical Logs from Database Endpoint */
async function pullHistoricalTelemetryStream() {
    try {
        const queryStream = await fetch(`${NETWORK_API_BASE}/api/logs`);
        const responseArray = await queryStream.json();
        const containerGrid = document.getElementById('historical-traffic-grid');
        if (!containerGrid) return;
        containerGrid.innerHTML = '';

        if (!responseArray || responseArray.length === 0) {
            containerGrid.innerHTML = `<div class="text-center py-6 text-slate-600 text-xs">No active telemetry stream elements mapped.</div>`;
            return;
        }

        responseArray.forEach(log => {
            const elementRow = document.createElement('div');
            let templateBorder = "border-slate-900 bg-slate-950/30 hover:border-cyan-500/20";
            let templateTextColor = "text-cyan-400";
            let templateBadgeColor = "bg-slate-900 text-slate-400 border-slate-800";

            if (log.verdict === 'Dangerous') {
                templateBorder = "border-red-950/40 bg-red-950/5 hover:border-red-500/20";
                templateTextColor = "text-red-500";
                templateBadgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
            } else if (log.verdict === 'Suspicious') {
                templateBorder = "border-amber-950/40 bg-amber-950/5 hover:border-amber-500/20";
                templateTextColor = "text-amber-500";
                templateBadgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
            }

            elementRow.className = `p-3.5 border rounded-xl flex items-center justify-between gap-4 transition text-xs ${templateBorder}`;
            elementRow.innerHTML = `
                <div class="flex-1 min-w-0 space-y-2 text-left">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded text-[8px] heading-font font-bold border uppercase tracking-widest ${templateBadgeColor}">
                            ${log.type}
                        </span>
                        <span class="text-[9px] text-slate-600 font-mono">
                            ${new Date(log.scannedAt).toLocaleTimeString()}
                        </span>
                    </div>
                    <p class="truncate font-mono text-slate-400 text-xs">${log.inputData}</p>
                </div>
                <div class="text-right flex flex-col items-end shrink-0 justify-center">
                    <span class="heading-font text-base font-black tracking-wider ${templateTextColor}">${log.score}%</span>
                    <span class="text-[8px] font-bold uppercase tracking-widest text-slate-600">
                        ${log.verdict === 'Dangerous' ? 'MALICIOUS' : log.verdict.toUpperCase()}
                    </span>
                </div>
            `;
            containerGrid.appendChild(elementRow);
        });
    } catch (err) { console.error("Telemetry history sync processing failure.", err); }
}
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
}

// Toggle listener
document.getElementById('chat-toggle').addEventListener('click', toggleChat);

// Handle Chat Input
document.getElementById('chat-input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const input = e.target;
        const messages = document.getElementById('chat-messages');
        
        // Add user message
        messages.innerHTML += `<div class="text-right text-cyan-500">${input.value}</div>`;
        
        // Mock Response logic
        setTimeout(() => {
            messages.innerHTML += `<div class="bg-slate-900 p-2 rounded-lg">Processing request: "${input.value}"... analysis complete. Status: Safe.</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 500);
        
        input.value = '';
    }
});
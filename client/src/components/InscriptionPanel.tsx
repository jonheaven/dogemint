import React, { useState } from "react";
import { Box, Button, Tabs, Tab, TextField, Typography, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  inscribeFile,
  inscribeText,
  drc20Deploy,
  drc20Mint,
  drc20Transfer
} from '../api/inscribe';

// Drag-and-drop file upload
function FileInscription({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFiles(Array.from(e.dataTransfer.files));
    }
  };
  return (
    <Paper elevation={2} sx={{ p: 3, textAlign: "center", border: dragActive ? "2px dashed #7c3aed" : "2px dashed #444" }}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={handleDrop}
    >
      <CloudUploadIcon sx={{ fontSize: 48, color: dragActive ? "#7c3aed" : "#888" }} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Click to select files, or drop your files here
      </Typography>
      <Typography variant="caption" sx={{ mt: 1 }}>
        Maximum 2500 files; for more, split them into smaller batches.
      </Typography>
      <input type="file" multiple style={{ display: "none" }} id="file-upload-input" onChange={e => {
        if (e.target.files) onFiles(Array.from(e.target.files));
      }} />
      <label htmlFor="file-upload-input">
        <Button variant="outlined" sx={{ mt: 2 }} component="span">Select Files</Button>
      </label>
    </Paper>
  );
}

// Text inscription
function TextInscription({ onText }: { onText: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <Box>
      <TextField
        label="Type or paste the text you'd like to inscribe."
        multiline
        minRows={6}
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography variant="caption">
        Stored as UTF-8 encoded plain text. Formatting and line breaks are preserved.
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => onText(text)} disabled={!text}>Inscribe Text</Button>
    </Box>
  );
}

// DRC-20 operations
function DRC20Panel({ onDeploy, onMint, onTransfer }: {
  onDeploy: (tick: string, supply: string, mintLimit: string, decimals: number) => void,
  onMint: (tick: string, amount: string, repeat?: number) => void,
  onTransfer: (tick: string, amount: string, repeat?: number) => void,
}) {
  const [tab, setTab] = useState(0);
  // Deploy
  const [deploy, setDeploy] = useState({ tick: "", supply: "", mintLimit: "", decimals: 18 });
  // Mint
  const [mint, setMint] = useState({ tick: "", amount: "", repeat: "" });
  // Transfer
  const [transfer, setTransfer] = useState({ tick: "", amount: "", repeat: "" });
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Deploy" />
        <Tab label="Mint" />
        <Tab label="Transfer" />
      </Tabs>
      {tab === 0 && (
        <Box>
          <TextField label="Token tick" value={deploy.tick} onChange={e => setDeploy({ ...deploy, tick: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Max supply" value={deploy.supply} onChange={e => setDeploy({ ...deploy, supply: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Mint limit" value={deploy.mintLimit} onChange={e => setDeploy({ ...deploy, mintLimit: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Decimals" type="number" value={deploy.decimals} onChange={e => setDeploy({ ...deploy, decimals: Number(e.target.value) })} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" onClick={() => onDeploy(deploy.tick, deploy.supply, deploy.mintLimit, deploy.decimals)} disabled={!deploy.tick || !deploy.supply}>Inscribe deploy</Button>
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <TextField label="Token tick" value={mint.tick} onChange={e => setMint({ ...mint, tick: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Amount to mint" value={mint.amount} onChange={e => setMint({ ...mint, amount: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Repeat count (optional)" value={mint.repeat} onChange={e => setMint({ ...mint, repeat: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" onClick={() => onMint(mint.tick, mint.amount, mint.repeat ? Number(mint.repeat) : undefined)} disabled={!mint.tick || !mint.amount}>Inscribe mint</Button>
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <TextField label="Token tick" value={transfer.tick} onChange={e => setTransfer({ ...transfer, tick: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Amount to transfer" value={transfer.amount} onChange={e => setTransfer({ ...transfer, amount: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Repeat count (optional)" value={transfer.repeat} onChange={e => setTransfer({ ...transfer, repeat: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" onClick={() => onTransfer(transfer.tick, transfer.amount, transfer.repeat ? Number(transfer.repeat) : undefined)} disabled={!transfer.tick || !transfer.amount}>Inscribe transfer</Button>
        </Box>
      )}
    </Box>
  );
}

// Main panel
export default function InscriptionPanel() {
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState<string>('');
  // Get API key and address from WalletPanel/localStorage (simplified)
  const apiKey = typeof window !== 'undefined' ? window.localStorage.getItem('tatumApiKey') || '' : '';
  const address = typeof window !== 'undefined' ? window.localStorage.getItem('dogeAddress') || '' : '';

  const handleFiles = async (files: File[]) => {
    setStatus('Uploading and inscribing files...');
    try {
      const txIds = await inscribeFile(files, address, apiKey);
      setStatus(`Files inscribed! TXIDs: ${txIds}`);
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  };
  const handleText = async (text: string) => {
    setStatus('Inscribing text...');
    try {
      const txId = await inscribeText(text, address, apiKey);
      setStatus(`Text inscribed! TXID: ${txId}`);
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  };
  const handleDeploy = async (tick: string, supply: string, mintLimit: string, decimals: number) => {
    setStatus('Deploying DRC-20...');
    try {
      const txId = await drc20Deploy(tick, supply, mintLimit, decimals, address, apiKey);
      setStatus(`DRC-20 deployed! TXID: ${txId}`);
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  };
  const handleMint = async (tick: string, amount: string, repeat?: number) => {
    setStatus('Minting DRC-20...');
    try {
      const txIds = await drc20Mint(tick, amount, repeat, address, apiKey);
      setStatus(`DRC-20 minted! TXIDs: ${txIds}`);
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  };
  const handleTransfer = async (tick: string, amount: string, repeat?: number) => {
    setStatus('Transferring DRC-20...');
    try {
      const txIds = await drc20Transfer(tick, amount, repeat, address, apiKey);
      setStatus(`DRC-20 transferred! TXIDs: ${txIds}`);
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  };
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Inscribe on Doginals</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="File" />
        <Tab label="Text" />
        <Tab label="DRC-20" />
      </Tabs>
      {tab === 0 && <FileInscription onFiles={handleFiles} />}
      {tab === 1 && <TextInscription onText={handleText} />}
      {tab === 2 && <DRC20Panel onDeploy={handleDeploy} onMint={handleMint} onTransfer={handleTransfer} />}
      {status && <Typography sx={{ mt: 3, color: status.startsWith('Error') ? 'red' : 'green' }}>{status}</Typography>}
    </Box>
  );
}

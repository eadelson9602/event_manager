#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

// También cargar .env si existe (menor prioridad)
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const port = process.env.PORT || '3000';

const nextDev = spawn('next', ['dev', '-p', port], {
  stdio: 'inherit',
  shell: true,
});

nextDev.on('close', (code) => {
  process.exit(code);
});


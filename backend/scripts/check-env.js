// Script simple para verificar que las variables de entorno estén configuradas
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

console.log('🔍 Verificando configuración de variables de entorno...\n');

if (!fs.existsSync(envPath)) {
  console.log('❌ No se encontró el archivo .env');
  console.log('📝 Crea el archivo .env en el directorio backend/');
  console.log('   Puedes copiar .env.example como base:\n');
  console.log('   Windows PowerShell: Copy-Item .env.example .env');
  console.log('   Linux/Mac/Git Bash: cp .env.example .env\n');
  process.exit(1);
}

console.log('✅ Archivo .env encontrado');

// Leer y verificar variables
require('dotenv').config({ path: envPath });

const requiredVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

let missingVars = [];
let emptyVars = [];

requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    missingVars.push(varName);
  } else if (value.includes('[YOUR') || value.includes('change-this')) {
    emptyVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('\n❌ Variables faltantes:');
  missingVars.forEach((v) => console.log(`   - ${v}`));
  process.exit(1);
}

if (emptyVars.length > 0) {
  console.log('\n⚠️  Variables con valores de ejemplo (debes cambiarlos):');
  emptyVars.forEach((v) => console.log(`   - ${v}`));
  console.log('\n💡 Edita el archivo .env y reemplaza los valores de ejemplo');
  process.exit(1);
}

console.log('\n✅ Todas las variables de entorno están configuradas correctamente');
console.log('\n📋 Variables configuradas:');
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (varName === 'DATABASE_URL') {
    // Ocultar la contraseña en la URL
    const masked = value.replace(/:[^:@]+@/, ':****@');
    console.log(`   ${varName}: ${masked}`);
  } else {
    console.log(`   ${varName}: ${value.substring(0, 20)}...`);
  }
});

console.log('\n🚀 Puedes continuar con:');
console.log('   npx prisma generate');
console.log('   npx prisma migrate dev');


#!/bin/bash

# Script para corrigir padrões de código usando ESLint e Prettier
# Uso: ./scripts/fix-code.sh [caminho opcional]

set -e

echo "🔧 Iniciando correção de padrões de código..."

# Diretório alvo (usa parâmetro se fornecido, senão usa todo o projeto)
TARGET_DIR=${1:-"."}

echo "📁 Diretório alvo: $TARGET_DIR"

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar se as dependências estão instaladas
if ! command_exists npx; then
    echo "❌ Error: npx não encontrado. Certifique-se que Node.js está instalado."
    exit 1
fi

echo "🔍 Executando ESLint para corrigir problemas automáticos..."
if npx eslint "$TARGET_DIR" --ext .js,.jsx,.ts,.tsx --fix; then
    echo "✅ ESLint executado com sucesso!"
else
    echo "⚠️  ESLint encontrou alguns problemas que não puderam ser corrigidos automaticamente."
    echo "   Execute 'npm run lint' para ver os detalhes."
fi

echo ""
echo "🎨 Executando Prettier para formatar código..."
if npx prettier --write "$TARGET_DIR/**/*.{js,jsx,ts,tsx,json,md}" 2>/dev/null; then
    echo "✅ Prettier executado com sucesso!"
else
    echo "⚠️  Alguns arquivos podem não ter sido formatados pelo Prettier."
fi

echo ""
echo "🔍 Verificando resultado final..."

# Executar lint novamente para mostrar problemas restantes
echo "📋 Problemas restantes do ESLint:"
if npx eslint "$TARGET_DIR" --ext .js,.jsx,.ts,.tsx --quiet; then
    echo "✅ Nenhum problema encontrado!"
else
    echo "⚠️  Ainda existem problemas que precisam ser corrigidos manualmente."
fi

echo ""
echo "📋 Verificação do Prettier:"
if npx prettier --check "$TARGET_DIR/**/*.{js,jsx,ts,tsx,json,md}" 2>/dev/null; then
    echo "✅ Todos os arquivos estão formatados corretamente!"
else
    echo "⚠️  Alguns arquivos ainda precisam ser formatados."
fi

echo ""
echo "🎉 Script de correção concluído!"
echo ""
echo "💡 Comandos úteis:"
echo "   npm run lint        - Verificar problemas do ESLint"
echo "   npm run lint:fix    - Corrigir problemas do ESLint automaticamente"
echo "   npm run format      - Formatar código com Prettier"
echo "   npm run format:check - Verificar formatação"
echo "   npm run code:fix    - Executar ESLint + Prettier juntos"
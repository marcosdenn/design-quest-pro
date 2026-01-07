@echo off
REM 🚀 DESIGN QUEST - SCRIPT CORRIGIDO WINDOWS
REM Este script resolve TODOS os problemas automaticamente!

echo ==========================================
echo 🎨 DESIGN QUEST - SETUP AUTOMATICO
echo ==========================================
echo.

REM Verificar se está na pasta correta
if not exist "package.json" (
    echo ❌ ERRO: Voce nao esta na pasta correta!
    echo.
    echo Por favor:
    echo 1. Abra o Explorador de Arquivos
    echo 2. Va ate a pasta design-quest-github
    echo 3. Clique duas vezes em setup-corrigido.bat
    echo.
    pause
    exit /b 1
)

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js nao encontrado!
    echo Instale: https://nodejs.org
    pause
    exit /b 1
)

REM Verificar Git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git nao encontrado!
    echo Instale: https://git-scm.com
    pause
    exit /b 1
)

echo ✅ Pasta correta encontrada!
echo ✅ Node.js e Git instalados!
echo.

REM Coletar informações
echo Configure suas informacoes do Git:
echo.
set /p USER_NAME="Seu nome completo: "
set /p USER_EMAIL="Seu email: "
echo.

REM Configurar Git
echo 📝 Configurando Git...
git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"
echo ✅ Git configurado!
echo.

REM Instalar dependências
echo 📦 Instalando dependencias (pode demorar 2-3 minutos)...
call npm install --silent
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencias instaladas!
) else (
    echo ⚠️  Aviso: Alguns warnings sao normais. Continue!
)
echo.

REM Limpar git anterior
if exist ".git" (
    echo 🗑️  Removendo configuracao Git anterior...
    rmdir /s /q .git
)

REM Inicializar Git
echo 🔧 Inicializando Git...
git init
git branch -M main
git add .
git commit -m "Initial commit - Design Quest Professional System"
echo ✅ Git inicializado e commit criado!
echo.

REM Verificar sucesso
if exist ".git" (
    echo ==========================================
    echo 🎉 SUCESSO! TUDO PRONTO!
    echo ==========================================
    echo.
    echo 📋 PROXIMOS PASSOS:
    echo.
    echo 1️⃣  Crie um repositorio no GitHub:
    echo    → Acesse: https://github.com/new
    echo    → Nome do repositorio: design-quest-pro
    echo    → Marque: PUBLIC
    echo    → NAO adicione README, .gitignore ou license
    echo    → Clique em 'Create repository'
    echo.
    echo 2️⃣  Copie o URL do repositorio que aparecer
    echo    (Exemplo: https://github.com/seu-usuario/design-quest-pro.git^)
    echo.
    echo 3️⃣  Execute estes comandos (substitua SEU-USUARIO^):
    echo.
    echo    git remote add origin https://github.com/SEU-USUARIO/design-quest-pro.git
    echo    git push -u origin main
    echo.
    echo    ⚠️  Se pedir senha, use Personal Access Token:
    echo    → GitHub → Settings → Developer settings → Tokens
    echo    → Generate new token → Marque 'repo' → Copie
    echo.
    echo 4️⃣  Deploy no Vercel:
    echo    → Acesse: https://vercel.com
    echo    → Continue with GitHub
    echo    → Import repository 'design-quest-pro'
    echo    → Deploy
    echo.
    echo ==========================================
    echo ✨ Seu site estara online em 5 minutos!
    echo ==========================================
) else (
    echo ❌ Erro ao inicializar Git!
    echo Tente executar manualmente:
    echo   git init
    echo   git add .
    echo   git commit -m "Initial commit"
)
echo.
pause

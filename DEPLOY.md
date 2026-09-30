# Publicação do portfólio: Vercel + Render

O projeto mantém a arquitetura existente: **Angular 18 estático na Vercel** e **API Spring Boot 3.3 / Java 17 no Render**. Não é necessário migrar frameworks.

## O que foi preparado

- `frontend/vercel.json`: build Angular, pasta publicada e fallback para rotas SPA.
- `frontend/scripts/write-runtime-config.mjs`: gera a URL da API usando a variável `API_URL` durante o build.
- `frontend/public/runtime-config.js` e `environment.prod.ts`: carregamento dessa configuração no Angular.
- `backend/Dockerfile`: imagem multi-stage Java 17/Maven compatível com Render.
- `backend/src/main/resources/application.properties`: porta, CORS e parâmetros de e-mail definidos por variáveis de ambiente.
- `.gitignore` e `backend/.dockerignore`: exclusão de artefatos locais e arquivos de ambiente.

## Antes de começar: envie as mudanças ao GitHub

1. Baixe e extraia o ZIP adaptado fornecido com este guia.
2. Clone o repositório existente e copie os arquivos extraídos por cima da cópia clonada, preservando a pasta `.git`:

   ```bash
   git clone https://github.com/ArtVieiraSantana/Portfolio_Arthur.git
   cd Portfolio_Arthur
   # Copie aqui o conteúdo da pasta Portfolio_Arthur-main extraída do ZIP.
   git status
   git add -A
   git commit -m "Configura deploy Vercel e Render"
   git push origin main
   ```

   Se a branch principal do repositório tiver outro nome, substitua `main` pelo nome exibido em `git branch --show-current`. No Windows, extraia o ZIP e copie seu conteúdo para a pasta clonada usando o Explorador de Arquivos; não apague `.git`.

3. O ZIP de deploy não inclui `node_modules`, cache Angular nem `backend/target`; cada plataforma instala/compila o que precisa. Não suba senhas ou arquivos `.env` para o GitHub.

> A Vercel e o Render precisam receber autorização para acessar esse repositório GitHub durante a importação.

## 1. Publicar o backend no Render

1. Entre em [Render](https://render.com/) e escolha **New → Web Service**.
2. Conecte o GitHub, selecione `ArtVieiraSantana/Portfolio_Arthur` e autorize o acesso ao repositório quando solicitado.
3. Configure:
   - **Name:** `portfolio-arthur-api` (ou outro nome; guarde o domínio gerado).
   - **Root Directory:** `backend`.
   - **Runtime/Language:** `Docker`.
   - **Dockerfile Path:** `Dockerfile`.
   - **Instance Type:** `Free`.
   - **Health Check Path:** `/api/health` (em Advanced/Health Check, se solicitado).
   - **Branch:** `main` (ou a branch publicada no GitHub).
4. Crie o serviço e aguarde o primeiro build. O Render define a variável `PORT`; o Spring Boot foi configurado para escutá-la automaticamente.
5. Copie o domínio público fornecido, por exemplo `https://portfolio-arthur-api.onrender.com`, e teste:

   ```text
   https://SEU-DOMINIO.onrender.com/api/health
   ```

   A resposta deve ser JSON com status `UP`. O controlador de health check já existe no projeto.

6. Em **Environment**, adicione/ajuste:
   - `CORS_ALLOWED_ORIGINS` = `http://localhost:4200` inicialmente; depois acrescente o domínio Vercel, conforme a seção 3. Vários domínios são separados por vírgula, sem barra final.
   - `CONTACT_EMAIL_ENABLED` = `false` (padrão; ver observação sobre o formulário abaixo).
   - `CONTACT_DESTINATION_EMAIL` = o e-mail que receberia notificações, caso implemente um provedor de e-mail compatível.
7. Salve as variáveis e deixe o Render concluir o redeploy.

## 2. Publicar o frontend na Vercel

1. Entre em [Vercel](https://vercel.com/) e escolha **Add New → Project**.
2. Importe o repositório GitHub `ArtVieiraSantana/Portfolio_Arthur`.
3. Em **Root Directory**, escolha `frontend` (não a raiz do monorepo).
4. Confira as opções de build (já declaradas em `frontend/vercel.json`):
   - **Framework Preset:** Angular, se a Vercel solicitar.
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist/portfolio-frontend/browser`.
   - **Install Command:** deixe automático; com `package-lock.json`, a Vercel instalará as dependências npm.
5. Antes do primeiro deploy, em **Environment Variables**, crie:
   - **Name:** `API_URL`
   - **Value:** `https://SEU-DOMINIO.onrender.com/api` (substitua pelo domínio exato obtido na etapa 1, incluindo `/api` e sem `/` no fim).
   - Marque **Production**, **Preview** e **Development** conforme os ambientes em que deseja testar.
6. Clique **Deploy**. O `prebuild` gera `public/runtime-config.js` com essa URL e o Angular consome a configuração.
7. Anote a URL pública da Vercel, por exemplo `https://portfolio-arthur.vercel.app`.

## 3. Liberar o domínio da Vercel no CORS do backend

1. No Render, abra o serviço → **Environment**.
2. Defina `CORS_ALLOWED_ORIGINS` com as origens completas, separadas por vírgula e sem barra no final. Exemplo:

   ```text
   http://localhost:4200,https://portfolio-arthur.vercel.app
   ```

   Se usar domínio personalizado, inclua-o também. Para testar previews da Vercel com o formulário, inclua os domínios de preview específicos necessários; o backend usa correspondência exata de origem.

3. Salve as mudanças e aguarde o redeploy do Render. Se necessário, faça um novo deploy da Vercel depois de definir/alterar `API_URL`.

## 4. Validar

- Abra a URL da Vercel e confira que imagens, estilos e fontes aparecem.
- Abra `https://SEU-DOMINIO.onrender.com/api/health`; confirme o status `UP`.
- Envie uma mensagem de teste pelo formulário. Verifique o console do navegador e os logs do serviço Render para erros HTTP/CORS.
- Se o primeiro envio falhar logo após um período ocioso, aguarde o Render iniciar o serviço e tente novamente.

## Observações importantes sobre os planos gratuitos

- O serviço web **Free** do Render é suspenso após 15 minutos sem tráfego e pode levar cerca de um minuto para voltar a responder no primeiro acesso. Limites, disponibilidade e regras do plano podem mudar; confira a documentação atual do Render.
- No Render Free, o sistema de arquivos é efêmero, instâncias podem reiniciar e **SMTP de saída nas portas 25, 465 e 587 é bloqueado**. Neste projeto `CONTACT_EMAIL_ENABLED` fica desligado por padrão; o endpoint valida a mensagem e a registra no log, mas isso não equivale a guardar mensagens permanentemente nem a enviá-las por e-mail. Não ative e-mail por SMTP no Render Free. Para notificações, integre posteriormente um provedor com API HTTP e guarde dados em armazenamento persistente apropriado.
- Vercel compila um site estático; a API não roda na Vercel. O backend permanece no Render.
- Alterar `API_URL` na Vercel exige um novo deploy. Alterar `CORS_ALLOWED_ORIGINS` no Render também exige aguardar o redeploy.

## URLs oficiais

- [Deployments Docker no Render](https://render.com/docs/docker)
- [Limitações do plano Free do Render](https://render.com/docs/free)
- [Configuração `vercel.json` e rewrites na Vercel](https://vercel.com/docs/project-configuration/vercel-json)

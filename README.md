# Estatística: Boss Final

Curso web interativo em português brasileiro para estudar Probabilidade e Estatística do zero, com autenticação Supabase, progresso por usuário, exercícios, calculadoras e simulado final.

## 1. Instalar dependências

```bash
npm install
```

No Windows PowerShell, se `npm` estiver bloqueado pela política de scripts, use:

```bash
npm.cmd install
```

## 2. Rodar o projeto

```bash
npm run dev
```

Ou, no PowerShell:

```bash
npm.cmd run dev
```

Depois abra o endereço mostrado pelo Vite, normalmente `http://127.0.0.1:5173`.

## 3. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com).
2. Crie uma organização ou use uma existente.
3. Clique em `New project`.
4. Escolha nome, senha do banco e região.
5. Aguarde o projeto ficar ativo.

## 4. Onde pegar `SUPABASE_URL`

No painel do Supabase:

1. Abra o projeto.
2. Vá em `Project Settings`.
3. Entre em `API`.
4. Copie o campo `Project URL`.

Esse valor vai em `VITE_SUPABASE_URL`.

## 5. Onde pegar `SUPABASE_ANON_KEY`

No mesmo menu `Project Settings > API`, copie a chave `anon public`.

Esse valor vai em `VITE_SUPABASE_ANON_KEY`.

Nunca use `service_role_key` no front-end.

## 6. Configurar `.env`

Crie um arquivo `.env` na raiz seguindo o modelo:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-public
```

O arquivo `.env.example` já contém os nomes das variáveis.

## 7. Criar tabelas e policies

No Supabase:

1. Abra `SQL Editor`.
2. Crie uma nova query.
3. Cole todo o conteúdo de `supabase/schema.sql`.
4. Clique em `Run`.

O SQL cria:

- `user_progress`
- `exercise_attempts`
- `quiz_scores`
- `user_stats`

Ele também ativa Row Level Security e cria policies para cada usuário ver e editar apenas os próprios dados.

## 8. Fluxo esperado

1. Usuário acessa o site.
2. Cria conta.
3. Faz login.
4. Entra no dashboard.
5. Estuda módulos.
6. Marca módulos como concluídos.
7. Faz exercícios.
8. Faz simulado.
9. Sai do site.
10. Volta depois.
11. Faz login novamente.
12. Tudo continua salvo no Supabase.

## 9. Publicar na Vercel

1. Suba o projeto para um repositório Git.
2. Acesse [vercel.com](https://vercel.com).
3. Clique em `Add New Project`.
4. Importe o repositório.
5. Framework: `Vite`.
6. Build command: `npm run build`.
7. Output directory: `dist`.
8. Clique em `Deploy`.

## 10. Variáveis de ambiente na Vercel

No projeto da Vercel:

1. Vá em `Settings`.
2. Entre em `Environment Variables`.
3. Adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Faça um novo deploy para aplicar.

## 11. Editar módulos

Edite:

```text
src/data/modules.ts
```

Cada módulo tem título, objetivo, explicação, fórmulas, símbolos, exemplos, macetes, pegadinhas e mini quiz.

## 12. Editar exercícios

Edite:

```text
src/data/exercises.ts
```

Cada exercício tem enunciado, dificuldade, categoria, dica, resposta e resolução completa em oito passos.

## 13. Editar perguntas do simulado

Edite:

```text
src/data/quiz.ts
```

Cada pergunta tem alternativas A, B, C, D, índice da resposta correta e explicação.

## 14. Mandar o link para amigos

Depois do deploy na Vercel, envie o link público gerado. Cada amigo cria a própria conta e o Supabase separa o progresso usando `auth.uid()` nas policies.

## Scripts úteis

```bash
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Estrutura principal

```text
src/
  components/
  data/
  lib/
  pages/
  services/
  styles/
  utils/
supabase/schema.sql
```
# estatistica-boss-final

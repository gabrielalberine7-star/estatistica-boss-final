create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  module_id text not null,
  completed boolean default false,
  progress_percent int default 0,
  updated_at timestamp with time zone default now(),
  unique(user_id, module_id)
);

create table if not exists exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  exercise_id text not null,
  is_correct boolean default false,
  attempts int default 1,
  updated_at timestamp with time zone default now(),
  unique(user_id, exercise_id)
);

create table if not exists quiz_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_id text not null,
  score int not null,
  max_score int not null,
  created_at timestamp with time zone default now()
);

create table if not exists user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  total_modules_completed int default 0,
  total_exercises_correct int default 0,
  total_exercises_wrong int default 0,
  best_boss_score int default 0,
  last_accessed_module text,
  updated_at timestamp with time zone default now()
);

alter table user_progress enable row level security;
alter table exercise_attempts enable row level security;
alter table quiz_scores enable row level security;
alter table user_stats enable row level security;

drop policy if exists "Users can view own progress" on user_progress;
create policy "Users can view own progress"
on user_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own progress" on user_progress;
create policy "Users can insert own progress"
on user_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on user_progress;
create policy "Users can update own progress"
on user_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can view own exercise attempts" on exercise_attempts;
create policy "Users can view own exercise attempts"
on exercise_attempts for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own exercise attempts" on exercise_attempts;
create policy "Users can insert own exercise attempts"
on exercise_attempts for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own exercise attempts" on exercise_attempts;
create policy "Users can update own exercise attempts"
on exercise_attempts for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can view own quiz scores" on quiz_scores;
create policy "Users can view own quiz scores"
on quiz_scores for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own quiz scores" on quiz_scores;
create policy "Users can insert own quiz scores"
on quiz_scores for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can view own stats" on user_stats;
create policy "Users can view own stats"
on user_stats for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own stats" on user_stats;
create policy "Users can insert own stats"
on user_stats for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own stats" on user_stats;
create policy "Users can update own stats"
on user_stats for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

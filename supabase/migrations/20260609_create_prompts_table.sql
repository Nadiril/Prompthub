create table if not exists prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  ai_tool text not null,
  user_id uuid references profiles(id) on delete cascade
);

create index if not exists idx_prompts_user_id on prompts(user_id);
create index if not exists idx_prompts_ai_tool on prompts(ai_tool);
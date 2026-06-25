-- Profiles table linked to Supabase Auth
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  email text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure prompts table has user_id column
alter table prompts 
  add column if not exists user_id uuid references profiles(id) on delete cascade;

create index if not exists idx_prompts_user_id on prompts(user_id);
create index if not exists idx_prompts_ai_tool on prompts(ai_tool);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table prompts enable row level security;

-- Policies for profiles
drop policy if exists "Profiles viewable by everyone" on profiles;
create policy "Profiles viewable by everyone" on profiles for select using (true);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Policies for prompts
drop policy if exists "Prompts viewable by everyone" on prompts;
create policy "Prompts viewable by everyone" on prompts for select using (true);

drop policy if exists "Authenticated users can insert prompts" on prompts;
create policy "Authenticated users can insert prompts" on prompts for insert with check (auth.uid() is not null);

drop policy if exists "Users can update own prompts" on prompts;
create policy "Users can update own prompts" on prompts for update using (user_id = auth.uid());

drop policy if exists "Users can delete own prompts" on prompts;
create policy "Users can delete own prompts" on prompts for delete using (user_id = auth.uid());
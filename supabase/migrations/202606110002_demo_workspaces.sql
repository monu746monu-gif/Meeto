create table if not exists public.demo_workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_key text not null,
  workspace_name text not null,
  content jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint demo_workspaces_unique_user_key unique (user_id, workspace_key)
);

create index if not exists demo_workspaces_user_created_idx
  on public.demo_workspaces (user_id, created_at desc);

alter table public.demo_workspaces enable row level security;

create policy "Users can read their demo workspaces"
  on public.demo_workspaces
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their demo workspaces"
  on public.demo_workspaces
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their demo workspaces"
  on public.demo_workspaces
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their demo workspaces"
  on public.demo_workspaces
  for delete
  using (auth.uid() = user_id);

create or replace function public.set_demo_workspaces_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_demo_workspaces_updated_at
  on public.demo_workspaces;

create trigger set_demo_workspaces_updated_at
  before update on public.demo_workspaces
  for each row
  execute function public.set_demo_workspaces_updated_at();

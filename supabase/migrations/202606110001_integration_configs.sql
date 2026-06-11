create table if not exists public.integration_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid null,
  agent_id uuid null,
  integration_type text not null,
  config_name text not null,
  content text not null,
  status text not null default 'generated',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint integration_configs_type_check check (
    integration_type in (
      'codex',
      'claude',
      'cursor',
      'openclaw',
      'custom-mcp',
      'local-bridge'
    )
  ),
  constraint integration_configs_status_check check (
    status in ('generated', 'configured', 'connected', 'archived')
  )
);

create index if not exists integration_configs_user_created_idx
  on public.integration_configs (user_id, created_at desc);

create index if not exists integration_configs_project_idx
  on public.integration_configs (project_id)
  where project_id is not null;

alter table public.integration_configs enable row level security;

create policy "Users can read their integration configs"
  on public.integration_configs
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their integration configs"
  on public.integration_configs
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their integration configs"
  on public.integration_configs
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their integration configs"
  on public.integration_configs
  for delete
  using (auth.uid() = user_id);

create or replace function public.set_integration_configs_updated_at()
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

drop trigger if exists set_integration_configs_updated_at
  on public.integration_configs;

create trigger set_integration_configs_updated_at
  before update on public.integration_configs
  for each row
  execute function public.set_integration_configs_updated_at();

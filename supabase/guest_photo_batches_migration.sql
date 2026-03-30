create table if not exists public.guest_photo_batches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  guest_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.guest_photo_items (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.guest_photo_batches(id) on delete cascade,
  storage_path text not null unique,
  file_name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.guest_photo_batches enable row level security;
alter table public.guest_photo_items enable row level security;

drop policy if exists "Public can view guest photo batches" on public.guest_photo_batches;
create policy "Public can view guest photo batches"
on public.guest_photo_batches
for select
using (true);

drop policy if exists "Authenticated guests can insert photo batches" on public.guest_photo_batches;
create policy "Authenticated guests can insert photo batches"
on public.guest_photo_batches
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Public can view guest photo items" on public.guest_photo_items;
create policy "Public can view guest photo items"
on public.guest_photo_items
for select
using (true);

drop policy if exists "Authenticated guests can insert photo items" on public.guest_photo_items;
create policy "Authenticated guests can insert photo items"
on public.guest_photo_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.guest_photo_batches batches
    where batches.id = batch_id
      and batches.user_id = auth.uid()
  )
);

insert into public.guest_photo_batches (id, user_id, guest_name, created_at)
select
  guest_photo_uploads.id,
  guest_photo_uploads.user_id,
  guest_photo_uploads.guest_name,
  guest_photo_uploads.created_at
from public.guest_photo_uploads
where not exists (
  select 1
  from public.guest_photo_batches batches
  where batches.id = guest_photo_uploads.id
);

insert into public.guest_photo_items (id, batch_id, storage_path, file_name, sort_order, created_at)
select
  gen_random_uuid(),
  guest_photo_uploads.id,
  guest_photo_uploads.storage_path,
  guest_photo_uploads.file_name,
  0,
  guest_photo_uploads.created_at
from public.guest_photo_uploads
where not exists (
  select 1
  from public.guest_photo_items items
  where items.batch_id = guest_photo_uploads.id
);

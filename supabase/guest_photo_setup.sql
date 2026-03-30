insert into storage.buckets (id, name, public)
values ('guest-photos', 'guest-photos', true)
on conflict (id) do update set public = true;

create table if not exists public.guest_photo_uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  guest_name text not null,
  storage_path text not null unique,
  file_name text not null,
  created_at timestamptz not null default now()
);

alter table public.guest_photo_uploads enable row level security;

drop policy if exists "Public can view guest photo uploads" on public.guest_photo_uploads;
create policy "Public can view guest photo uploads"
on public.guest_photo_uploads
for select
using (true);

drop policy if exists "Authenticated guests can insert uploads" on public.guest_photo_uploads;
create policy "Authenticated guests can insert uploads"
on public.guest_photo_uploads
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Authenticated guests can upload files" on storage.objects;
create policy "Authenticated guests can upload files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'guest-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

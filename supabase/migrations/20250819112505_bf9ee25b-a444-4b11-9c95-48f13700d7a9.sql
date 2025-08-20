
create type if not exists public.newsletter_segment as enum ('donors', 'partners', 'supporters', 'general');

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  segment public.newsletter_segment not null default 'general',
  source_page text,
  consent boolean not null default true,
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.newsletter_subscriptions enable row level security;

create policy "Anyone can subscribe" 
on public.newsletter_subscriptions
for insert
to anon, authenticated
with check (true);

create policy "Admins can view subscriptions"
on public.newsletter_subscriptions
for select
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'));

create policy "Admins can manage subscriptions"
on public.newsletter_subscriptions
for update
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'))
with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'));

create policy "Admins can delete subscriptions"
on public.newsletter_subscriptions
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'));

create unique index if not exists newsletter_subscriptions_email_segment_idx
on public.newsletter_subscriptions (lower(email), segment);

create trigger set_updated_at_before_update
before update on public.newsletter_subscriptions
for each row execute procedure public.update_updated_at_column();

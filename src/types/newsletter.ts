// Temporary types for newsletter subscriptions until Supabase types are updated
export interface NewsletterSubscription {
  id: string;
  email: string;
  name: string | null;
  segment: 'donors' | 'partners' | 'supporters' | 'general';
  source_page: string | null;
  status: 'subscribed' | 'unsubscribed';
  consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriptionInsert {
  email: string;
  name?: string | null;
  segment: 'donors' | 'partners' | 'supporters' | 'general';
  source_page?: string | null;
  status?: 'subscribed' | 'unsubscribed';
  consent: boolean;
}
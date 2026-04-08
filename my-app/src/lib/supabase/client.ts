import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://');

let supabase: SupabaseClient;

if (isValidUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    '⚠️ Supabase credentials missing. Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
  // Create a dummy client that won't crash the app
  // Auth features will not work until real credentials are provided
  supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      if (prop === 'auth') {
        return new Proxy({}, {
          get() {
            return async () => ({
              data: { user: null, session: null },
              error: { message: 'Supabase is not configured. Please add environment variables.' },
            });
          },
        });
      }
      return () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } });
    },
  });
}

export const isSupabaseConfigured = isValidUrl && !!supabaseAnonKey;
export { supabase };

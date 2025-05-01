import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createUserAccount(userId: string) {
  const { error } = await supabase
    .from('user_accounts')
    .insert([{ user_id: userId }]);
  
  if (error) throw error;
}

export async function getUserAccount(userId: string) {
  const { data, error } = await supabase
    .from('user_accounts')
    .select(`
      *,
      active_package:packages(*),
      orders:orders(*)
    `)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      package:packages(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
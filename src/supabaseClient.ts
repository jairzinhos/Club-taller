import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los que te da Supabase en Project Settings > API
const supabaseUrl = 'https://nwzwxxfuqfwmyaeftxwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53end4eGZ1cWZ3bXlhZWZ0eHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODk3ODQsImV4cCI6MjA4Njg2NTc4NH0.xIe9NOeW7MO0S0nu4esZyhRE4uTaZKBZO4etyskWFyc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
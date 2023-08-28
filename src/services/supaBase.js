import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tjfplbwsoorynsirqihu.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZnBsYndzb29yeW5zaXJxaWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMDUxNzEsImV4cCI6MjAwNzU4MTE3MX0.P6FtMbuEFJre-RqpGrtUbxzjn6Khp_j84ppGtuIAPa0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

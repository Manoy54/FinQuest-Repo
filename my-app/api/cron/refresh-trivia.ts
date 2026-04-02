/* eslint-disable @typescript-eslint/no-explicit-any */
declare const process: any;
// api/cron/refresh-trivia.ts
import { createClient } from '@supabase/supabase-js';
import { fetchDailyTriviaContent } from '../../src/features/trivia/services/generateDailyTrivia';

export default async function handler(req: any, res: any) {
  // Simple check to ensure this is invoked securely. 
  // Vercel Cron will send a Bearer token matching CRON_SECRET envar.
  if (process.env.CRON_SECRET) {
     if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    // Prefer service role key to insert past RLS if testing/invoking daily
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const todayStr = new Date().toISOString().split('T')[0];
    
    const newTrivia = await fetchDailyTriviaContent();
    
    const inserts = newTrivia.map(t => ({
      date_str: todayStr,
      title: t.title,
      summary: t.summary,
      source: t.source,
      link: t.link
    }));

    // Perform an upsert based on the unique combination of date_str and title
    const { error } = await supabase
      .from('daily_trivia')
      .upsert(inserts, { onConflict: 'date_str, title' });

    if (error) {
      console.error("Cron insertion error:", error);
      return res.status(500).json({ error: "Insert failed", details: error });
    }

    return res.status(200).json({ success: true, count: inserts.length });
  } catch (error) {
    console.error("Cron execution error", error);
    return res.status(500).json({ error: "Failed to execute cron task" });
  }
}

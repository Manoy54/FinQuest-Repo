/* eslint-disable @typescript-eslint/no-explicit-any */
declare const process: any;
// api/trivia/today.ts
import { createClient } from '@supabase/supabase-js';
import { fetchDailyTriviaContent } from '../../src/features/trivia/services/generateDailyTrivia';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    // Format today's date
    const todayStr = new Date().toISOString().split('T')[0];

    // Attempt Database check first if configured
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('daily_trivia')
        .select('*')
        .eq('date_str', todayStr);

      if (error) console.error("Database fetch error:", error);

      if (data && data.length > 0) {
        return res.status(200).json(data);
      }

      // If missing for today, fetch new ones
      const newTrivia = await fetchDailyTriviaContent();
      
      const inserts = newTrivia.map(t => ({
        date_str: todayStr,
        title: t.title,
        summary: t.summary,
        source: t.source,
        link: t.link
      }));
      
      const { data: insertedData, error: insertError } = await supabase
        .from('daily_trivia')
        .insert(inserts)
        .select();

      if (!insertError && insertedData) {
        return res.status(200).json(insertedData);
      }
    }
    
    // Fallback: If DB isn't configured or insert failed, just serve freshly fetched items or static locally
    const freshTrivia = await fetchDailyTriviaContent();
    return res.status(200).json(freshTrivia.map(t => ({
         ...t,
         id: Math.random().toString(36).substring(2, 10),
         date_str: todayStr
    })));

  } catch (error) {
    console.error("API Error in /api/trivia/today:", error);
    return res.status(500).json({ error: "Failed to fetch today's trivia" });
  }
}

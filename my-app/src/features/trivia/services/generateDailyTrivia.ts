// src/services/generateDailyTrivia.ts

export interface TriviaItem {
  title: string;
  summary: string;
  source: string;
  link?: string;
}

export async function fetchDailyTriviaContent(): Promise<TriviaItem[]> {
  try {
    // Attempt 1: Fetch from NewsData.io (if API key is present)
    // @ts-ignore
    const apiKey = (typeof process !== 'undefined' ? process.env.NEWSDATA_API_KEY : '') || (import.meta as any).env?.VITE_NEWSDATA_API_KEY;
    if (apiKey) {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=economy OR finance OR inflation OR "bangko sentral" OR "bsp"&country=ph&language=en`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return data.results.slice(0, 5).map((article: any) => ({
            title: article.title,
            summary: article.description || "Read more about this financial update.",
            source: article.source_id || "NewsData.io",
            link: article.link || url,
          }));
        }
      }
    }

    // Attempt 2: BSP RSS Fallback (regex based to avoid dependencies)
    try {
      // NOTE: fetching from BSP RSS might get blocked by CORS or bot protection if directly fetched
      // in browser, but this service is meant for backend API / Cron Serverless execution
      const bspRes = await fetch("https://www.bsp.gov.ph/SitePages/RSS.aspx?RSSName=BSPNews", {
          headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
          }
      });
      if (bspRes.ok) {
        const xml = await bspRes.text();
        const items = extractRssItems(xml).slice(0, 5);
        if (items.length > 0) {
          return items.map((item) => ({
            title: item.title,
            summary: item.summary,
            source: "BSP Official News",
            link: item.link,
          }));
        }
      }
    } catch (err) {
      console.warn("BSP RSS fetch failed", err);
    }
  } catch (err) {
    console.error("Error fetching daily trivia:", err);
  }

  // Fallback 3: Return static locally generated daily topics based on the date
  return getFallbackTrivia();
}

function extractRssItems(xmlString: string) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xmlString)) !== null) {
    const itemContent = match[1];

    const titleMatch = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/.exec(itemContent);
    const title = titleMatch ? titleMatch[1].trim() : "BSP Update";

    const descMatch = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/.exec(itemContent);
    const rawDesc = descMatch ? descMatch[1].trim() : "Recent updates from the Bangko Sentral ng Pilipinas.";
    const plainDesc = rawDesc.replace(/<[^>]*>?/gm, "").substring(0, 150) + "...";

    const linkMatch = /<link>([\s\S]*?)<\/link>/.exec(itemContent);
    const link = linkMatch ? linkMatch[1].trim() : "https://www.bsp.gov.ph";

    items.push({ title, summary: plainDesc, link });
  }
  return items;
}

export function getFallbackTrivia(): TriviaItem[] {
  const fallbacks = [
    {
      title: "Understanding Inflation",
      summary: "Inflation is the rate at which the general level of prices for goods and services is rising. The BSP actively monitors it to ensure price stability.",
      source: "Philippine Finance Basics",
      link: "https://www.bsp.gov.ph/SitePages/EducationAndAdvocacy/Inflation.aspx",
    },
    {
      title: "What is a Key Policy Rate?",
      summary: "The BSP sets the key policy rate, which influences the interest rates banks charge consumers. It directly affects how expensive it is to borrow money.",
      source: "BSP Key Rates",
      link: "https://www.bsp.gov.ph/SitePages/Statistics/KeyRates.aspx",
    },
    {
      title: "The Peso Exchange Rate",
      summary: "Exchange rates determine how much the Philippine Peso is worth compared to other currencies. It impacts the purchasing power of OFW remittances.",
      source: "Economy Watch",
      link: "https://www.bsp.gov.ph/sitepages/statistics/exchangerate.aspx",
    },
    {
      title: "Bonds as an Investment",
      summary: "Retail Treasury Bonds (RTBs) are low-risk investments issued by the Philippine government, allowing regular Filipinos to earn interest while funding state projects.",
      source: "DOF Economic Education",
      link: "https://www.treasury.gov.ph",
    },
    {
      title: "Gross Domestic Product (GDP)",
      summary: "GDP measures the total value of all goods and services produced within a country. It's a primary indicator of the Philippine economy's health.",
      source: "PSA Statistics",
      link: "https://psa.gov.ph",
    },
    {
      title: "Digital Banks in PH",
      summary: "The BSP has approved several digital banks to promote financial inclusion, allowing Filipinos to open accounts with higher interest rates and zero maintaining balance.",
      source: "BSP Financial Inclusion",
      link: "https://www.bsp.gov.ph",
    }
  ];

  // Scramble slightly daily
  const seed = new Date().getDate();
  
  // To keep it somewhat deterministic for the day, we can do a simple selection
  const selected = [];
  for (let i = 0; i < 5; i++) {
    const index = (seed + i) % fallbacks.length;
    selected.push(fallbacks[index]);
  }

  return selected;
}

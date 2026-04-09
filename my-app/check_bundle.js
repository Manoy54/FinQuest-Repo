const https = require('https');

https.get('https://finquest-five.vercel.app/index.html', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const jsMatches = rawData.match(/src=\"(.*?\.js)\"/g);
        console.log('JS files observed:', jsMatches);
        if (jsMatches) {
            jsMatches.forEach(match => {
                const src = match.match(/\"(.*?)\"/)[1];
                https.get('https://finquest-five.vercel.app' + src, (jsRes) => {
                    let jsData = '';
                    jsRes.on('data', (chunk) => { jsData += chunk; });
                    jsRes.on('end', () => {
                        console.log('Checking ' + src + ' for supabase domain: ', jsData.includes('tajlfowzyjbtkrtogqsw.supabase.co'));
                        console.log('Checking ' + src + ' for localhost: ', jsData.includes('localhost'));
                    });
                });
            });
        }
    });
});

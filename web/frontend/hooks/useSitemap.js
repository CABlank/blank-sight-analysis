import { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';

const useSitemap = () => {
  const [useSitemap, setSitemap] = useState(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      const res = await axios.get('/api/sitemap');
      const parsedXml = await xml2js.parseStringPromise(res.data); // Parse XML data to JavaScript object
      const urls = parsedXml.sitemapindex.sitemap.map(sitemap => sitemap.loc[0]); // Extract URLs
      setSitemap(urls);
    };

    fetchSitemap();
  }, []);

  return useSitemap;
};

export { useSitemap };

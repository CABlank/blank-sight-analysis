import { useState, useEffect } from 'react';
import axios from 'axios';

const useSitemap = () => {
  const [sitemap, setSitemap] = useState(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      const res = await axios.get('/api/sitemap');
      setSitemap(res.data);
    };

    fetchSitemap();
  }, []);

  return sitemap;
};

export default useSitemap;

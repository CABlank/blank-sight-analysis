// components/Sitemap.jsx
import React from 'react';
import { useSitemap } from '../hooks/useSitemap';

export const SiteMap = () => {
  const sitemap = useSitemap();

  if (!sitemap) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {sitemap.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noreferrer">{url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;

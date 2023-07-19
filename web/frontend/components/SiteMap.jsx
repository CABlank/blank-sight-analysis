import React from 'react';
import useSitemap from '../hooks';

const SiteMap = () => {
  const sitemap = useSitemap();

  if (!sitemap) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Logic to display the sitemap data */}
    </div>
  );
};

export default SiteMap;

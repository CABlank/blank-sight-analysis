import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';

const DomainExtractor = () => {
  const location = useLocation();
  const app = useAppBridge();
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shop = searchParams.get('shop');
    if (shop) {
      getSessionToken(app)
        .then((token) => {
          fetch(`https://blank-sight-analysis-551f1a0e4152.herokuapp.com/api/shopify/${shop}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })          
            .then((response) => response.json())
            .then((data) => {
              setDomain(data.shop.myshopify_domain);
            })
            .catch((error) => {
              console.error('Failed to fetch custom domain:', error);
            });
        });
    }
  }, [app, location.search]);

  return (
    <div>
      <h1>Store Domain</h1>
      <p>{domain}</p>
    </div>
  );
};

export default DomainExtractor;

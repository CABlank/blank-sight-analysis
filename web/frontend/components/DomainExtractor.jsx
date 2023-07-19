import React, { useState, useEffect } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export function DomainExtractor() {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [domainData, setDomainData] = useState(null);
  const [domainLoading, setDomainLoading] = useState(true);
  const [domainError, setDomainError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const shop = 'testseoappblankdev.myshopify.com'; // Replace with the actual shop domain
        const url = `/api/shop/domains?shop=${encodeURIComponent(shop)}`;
  
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
  
        const data = await res.json();
  
        setDomainData(data);
        setDomainLoading(false);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setDomainError(error);
        setDomainLoading(false);
      }
    };
  
    fetchDomains();
  }, []);
  
  

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  return (
    <>
      {toastMarkup}
        <TextContainer spacing="loose">
          <p>{t("ProductsCard.description")}</p>
          {domainLoading && <p>Loading domain...</p>}
          {domainError && <p>Error loading domain: {domainError.message}</p>}
          {domainData && domainData.map((domain, index) => (
            <div key={index}>
              <h3>Shop domain {index + 1}:</h3>
              <p>ID: {domain.id}</p>
              <p>URL: {domain.url}</p>
              <p>Host: {domain.host}</p>
            </div>
          ))}
        </TextContainer>
    </>
  );
};

export default DomainExtractor;

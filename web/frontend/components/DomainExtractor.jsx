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
      const client = new shopify.clients.Graphql({session});
      
      try {
        const data = await client.query({
          data: `query {
            shop {
              domains {
                id
                host
                url
              }
            }
          }`,
        });
        
        setDomainData(data);
        setDomainLoading(false);
      } catch (error) {
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
          {domainData && domainData.shop.domains.map((domain, index) => (
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

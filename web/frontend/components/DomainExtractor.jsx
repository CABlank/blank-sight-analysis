import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_SHOP_DOMAINS = gql`
  query {
    shop {
      domains {
        id
        host
        url
      }
    }
  }
`;

export function DomainExtractor() {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const { t } = useTranslation();

  const { loading: domainLoading, error: domainError, data: domainData } = useQuery(GET_SHOP_DOMAINS);

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

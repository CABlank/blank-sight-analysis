import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_SHOP_PRIMARY_DOMAIN = gql`
  query {
    shop {
      primaryDomain {
        url
        host
      }
    }
  }
`;

export function DomainExtractor() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const {
    data: productCountData,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const { loading: domainLoading, error: domainError, data: domainData } = useQuery(GET_SHOP_PRIMARY_DOMAIN);

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: t("ProductsCard.productsCreatedToast", {
          count: productsCount,
        }),
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: t("ProductsCard.errorCreatingProductsToast"),
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title={t("ProductsCard.title")}
        sectioned
        primaryFooterAction={{
          content: t("ProductsCard.populateProductsButton", {
            count: productsCount,
          }),
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>{t("ProductsCard.description")}</p>
          <Text as="h4" variant="headingMd">
            {t("ProductsCard.totalProductsHeading")}
            <Text variant="bodyMd" as="p" fontWeight="semibold">
              {isLoadingCount ? "-" : productCountData.count}
            </Text>
          </Text>
          {domainLoading && <p>Loading domain...</p>}
          {domainError && <p>Error loading domain: {domainError.message}</p>}
          {domainData && (
            <div>
              <h3>Shop's primary domain:</h3>
              <p>URL: {domainData.shop.primaryDomain.url}</p>
              <p>Host: {domainData.shop.primaryDomain.host}</p>
            </div>
          )}
        </TextContainer>
      </Card>
    </>
  );
}

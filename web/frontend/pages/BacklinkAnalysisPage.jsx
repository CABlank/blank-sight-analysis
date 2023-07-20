import React from 'react';
import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { SiteMap } from '../components';

export default function SitemapPage() {
  return (
    <div>
      <h1></h1>
      <SiteMap />
    </div>
  );
};

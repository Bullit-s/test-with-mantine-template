import { useTranslation } from 'react-i18next';
import { Alert, Card, Group, Loader, SimpleGrid, Stack, Title } from '@mantine/core';
import { useHomePage } from '../model';
import { StageBar, StageChips } from './filters';
import {
  CollapsibleSection,
  KpiStrip,
  ManagerCards,
  RecentActivity,
  UpcomingDeliveries,
} from './overview';
import Search from './search';
import { RequestsFooter, RequestsTable } from './table';

export default function HomePage() {
  const { t } = useTranslation();
  const {
    isLoading,
    isError,
    requests,
    stageCounts,
    stageShares,
    activeStage,
    setActiveStage,
    footerCount,
    footerSumRub,
    kpiSummary,
    recentActivity,
    upcomingDeliveries,
    managerSummaries,
  } = useHomePage();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert color="red">{t('orders.loadError')}</Alert>;
  }

  return (
    <Stack gap="md">
      <CollapsibleSection title={t('home.overview.title')} storageKey="home.overview.opened">
        <KpiStrip kpi={kpiSummary} />

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <RecentActivity items={recentActivity} />
          <UpcomingDeliveries items={upcomingDeliveries} />
        </SimpleGrid>

        <ManagerCards managers={managerSummaries} />
      </CollapsibleSection>

      <Group>
        <Title order={3}>{t('home.requests')}</Title>
        <Search />
      </Group>

      <Card withBorder radius="md" p="lg">
        <Stack gap="md">
          <StageChips activeStage={activeStage} onChange={setActiveStage} counts={stageCounts} />
          <StageBar shares={stageShares} activeStage={activeStage} disable={!requests?.length} />
          <RequestsTable items={requests} />
          <RequestsFooter count={footerCount} stage={activeStage} sumRub={footerSumRub} />
        </Stack>
      </Card>
    </Stack>
  );
}

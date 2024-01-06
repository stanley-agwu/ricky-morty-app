'use client';

import React from 'react';
import { fetcher } from '../services/api-service';
import { Table } from '../components/Table/Table/Table';
import styles from '../page.module.scss';
import { ContentContainer } from '../components/ContentBox/ContentBox';
import {
  TableHead,
  TableBody,
  HeaderCell,
  Row,
  Cell,
} from '../components/Table';
import { Header, HeaderType } from '../components/Header/Header';
import { endPoints } from '../config/routes';
import useSWR from 'swr';
import { CharactersResult, EpisodesResult, LocationsResult } from '../models';
import { Select } from '../components/Select/Select';
import { sx } from '../layout';
import { NavigationHeader } from '../components/NavigationHeader/NavigationHeader';
import { formateDate, getStriped } from '../utils/common';

const Episodes = () => {
  const { data, error, isLoading } = useSWR<EpisodesResult>(
    endPoints.episodes,
    fetcher
  );

  return (
    <ContentContainer className={styles.episodes}>
      <NavigationHeader>
        <Header title='Episodes' headerType={HeaderType.h1} />
      </NavigationHeader>
      <div className={styles.table}>
        <Table>
          <TableHead className={styles.header}>
            <Row>
              <HeaderCell {...sx}>Name</HeaderCell>
              <HeaderCell {...sx}>Episode</HeaderCell>
              <HeaderCell {...sx}>Air date</HeaderCell>
              <HeaderCell {...sx}>Date created</HeaderCell>
            </Row>
          </TableHead>
          <TableBody className={styles.tablebody}>
            {data?.results.map((episode, idx) => (
              <Row
                key={episode.id}
                hover
                onClick={() => {}}
                isStriped={getStriped(idx)}
              >
                <Cell {...sx}>{episode.name}</Cell>
                <Cell {...sx}>{episode.episode}</Cell>
                <Cell {...sx}>{episode.air_date}</Cell>
                <Cell {...sx}>{formateDate(episode.created)}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentContainer>
  );
};

export default Episodes;

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
import { CharactersResult, LocationsResult } from '../models';
import { Select } from '../components/Select/Select';
import { sx } from '../layout';
import { NavigationHeader } from '../components/NavigationHeader/NavigationHeader';
import { formateDate, getStriped } from '../utils/common';

const Locations = () => {
  const { data, error, isLoading } = useSWR<LocationsResult>(
    endPoints.locations,
    fetcher
  );

  return (
    <ContentContainer className={styles.locations}>
      <NavigationHeader>
        <Header title='Locations' headerType={HeaderType.h1} />
      </NavigationHeader>
      <div className={styles.table}>
        <Table>
          <TableHead className={styles.header}>
            <Row>
              <HeaderCell {...sx}>Name</HeaderCell>
              <HeaderCell {...sx}>Type</HeaderCell>
              <HeaderCell {...sx}>Dimensions</HeaderCell>
              <HeaderCell {...sx}>Date created</HeaderCell>
            </Row>
          </TableHead>
          <TableBody className={styles.tablebody}>
            {data?.results.map((location, idx) => (
              <Row
                key={location.id}
                hover
                onClick={() => {}}
                isStriped={getStriped(idx)}
              >
                <Cell {...sx}>{location.name}</Cell>
                <Cell {...sx}>{location.type}</Cell>
                <Cell {...sx}>{location.dimension}</Cell>
                <Cell {...sx}>{formateDate(location.created)}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentContainer>
  );
};

export default Locations;

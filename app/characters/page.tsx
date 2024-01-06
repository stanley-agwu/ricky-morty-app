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
import { CharactersResult } from '../models';
import { Select } from '../components/Select/Select';
import { sx } from '../layout';
import { NavigationHeader } from '../components/NavigationHeader/NavigationHeader';
import { formateDate, getStriped } from '../utils/common';

const Characters = () => {
  const { data, error, isLoading } = useSWR<CharactersResult>(
    endPoints.characters,
    fetcher
  );

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ];

  const statusOptions = [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'dead' },
    { value: 'unknown', label: 'Unknown' },
  ];

  return (
    <ContentContainer className={styles.characters}>
      <NavigationHeader>
        <Header title='Characters' headerType={HeaderType.h1} />
      </NavigationHeader>
      <div className={styles.select}>
        <Select
          isMulti
          options={genderOptions}
          placeholder='Filter by gender'
        />
        <Select
          isMulti
          options={statusOptions}
          placeholder='Filter by status'
        />
      </div>
      <div className={styles.table}>
        <Table>
          <TableHead className={styles.header}>
            <Row>
              <HeaderCell {...sx}>Name</HeaderCell>
              <HeaderCell {...sx}>Status</HeaderCell>
              <HeaderCell {...sx}>Species</HeaderCell>
              <HeaderCell {...sx}>Date created</HeaderCell>
            </Row>
          </TableHead>
          <TableBody className={styles.tablebody}>
            {data?.results.map((character, idx) => (
              <Row
                key={character.id}
                hover
                onClick={() => {}}
                isStriped={getStriped(idx)}
              >
                <Cell {...sx}>{character.name}</Cell>
                <Cell {...sx}>{character.status}</Cell>
                <Cell {...sx}>{character.species}</Cell>
                <Cell {...sx}>{formateDate(character.created)}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentContainer>
  );
};

export default Characters;

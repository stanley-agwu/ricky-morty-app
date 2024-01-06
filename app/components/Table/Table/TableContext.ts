'use client';

import { createContext, useContext } from "react";

import { type TableProps } from './Table';

export const TableContext = createContext<TableProps>({});

export const useTableContext = () => useContext(TableContext);

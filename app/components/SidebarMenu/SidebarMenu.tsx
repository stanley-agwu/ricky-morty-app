'use-client';

import Sidebar, { SidebarMenuIcon } from '../Sidebar/Sidebar';
import Characters from './assets/characters.svg';
import Locations from './assets/locations.svg';
import Episodes from './assets/episodes.svg';
import { BreakPointContext, useBreakPoints } from '@/app/hooks/useBreakPoints';

import styles from './SidebarMenu.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Outlet } from 'react-router-dom';

const SidebarMenu = () => {
  const isCharactersSelected = true;
  return (
    <Sidebar>
      <Sidebar.MenuTitle>Ricky Morty App</Sidebar.MenuTitle>
      <Sidebar.MenuList>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={'/characters'}
          active={isCharactersSelected}
        >
          <SidebarMenuIcon icon={<Image src={Characters} alt='Characters' />} />
          Characters
        </Sidebar.MenuItem>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={'/characters'}
          active={!isCharactersSelected}
        >
          <SidebarMenuIcon icon={<Image src={Locations} alt='Locations' />} />
          Locations
        </Sidebar.MenuItem>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={'/characters'}
          active={!isCharactersSelected}
        >
          <SidebarMenuIcon icon={<Image src={Episodes} alt='Episodes' />} />
          Episodes
        </Sidebar.MenuItem>
      </Sidebar.MenuList>
    </Sidebar>
  );
};

const SidebarContainer = () => {
  const breakpoints = useBreakPoints();

  return (
    <BreakPointContext.Provider value={breakpoints}>
      {breakpoints.isMobile ? (
        <div className={styles.sidebarMobileContainer}>
          <Outlet />
        </div>
      ) : (
        <div className={styles.sidebarContainer}>
          <SidebarMenu />
          <Outlet />
        </div>
      )}
    </BreakPointContext.Provider>
  );
};

export default SidebarContainer;

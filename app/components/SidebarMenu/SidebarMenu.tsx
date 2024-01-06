'use-client';

import Sidebar, { SidebarMenuIcon } from '../Sidebar/Sidebar';
import Characters from './assets/characters.svg';
import Locations from './assets/locations.svg';
import Episodes from './assets/episodes.svg';
import { BreakPointContext, useBreakPoints } from '@/app/hooks/useBreakPoints';

import styles from './SidebarMenu.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/app/config/routes';

const SidebarMenu = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <Sidebar.MenuTitle>Ricky Morty App</Sidebar.MenuTitle>
      <Sidebar.MenuList>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={routes.characters}
          active={pathname === routes.characters}
        >
          <SidebarMenuIcon icon={<Image src={Characters} alt='Characters' />} />
          Characters
        </Sidebar.MenuItem>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={routes.locations}
          active={pathname === routes.locations}
        >
          <SidebarMenuIcon icon={<Image src={Locations} alt='Locations' />} />
          Locations
        </Sidebar.MenuItem>
        <Sidebar.MenuItem
          Wrapper={Link}
          href={routes.episodes}
          active={pathname === routes.episodes}
        >
          <SidebarMenuIcon icon={<Image src={Episodes} alt='Episodes' />} />
          Episodes
        </Sidebar.MenuItem>
      </Sidebar.MenuList>
    </Sidebar>
  );
};

const SidebarContainer = ({ isOpen = false }) =>
  isOpen ? (
    <div className={styles.sidebarContainer}>
      <SidebarMenu />
    </div>
  ) : null;

export const DeskTopSidebar = () => {
  const { isMobile } = useBreakPoints();
  return <SidebarContainer isOpen={!isMobile} />;
};
export const MobileSidebar = ({ isOpen = false }) => (
  <SidebarContainer isOpen={isOpen} />
);

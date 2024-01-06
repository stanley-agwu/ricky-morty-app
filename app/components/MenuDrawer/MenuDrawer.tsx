import { Box, SwipeableDrawer } from '@mui/material';
import { HTMLAttributes, MouseEvent, ReactNode, SyntheticEvent } from 'react';
import { MobileSidebar } from '@/app/components/SidebarMenu/SidebarMenu';

interface MenuDrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  toggleDrawer: (e: SyntheticEvent<{}, Event>) => void;
  children: ReactNode;
}

export const MenuDrawer = ({
  isOpen,
  onClose,
  toggleDrawer,
  children,
}: MenuDrawerProps) => (
  <Box>
    {children}
    <SwipeableDrawer
      anchor='left'
      open={isOpen}
      onClose={onClose}
      onOpen={toggleDrawer}
    >
      <MobileSidebar isOpen={isOpen} />
    </SwipeableDrawer>
  </Box>
);

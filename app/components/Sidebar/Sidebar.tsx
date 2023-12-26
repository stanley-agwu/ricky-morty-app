import {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  LiHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import styles from './Sidebar.module.scss';

export type SidebarMenuTitle = ComponentPropsWithoutRef<'h2'>;

export const SidebarMenuTitle = ({
  children,
  className,
  ...props
}: SidebarMenuTitle) => (
  <h1 className={classNames(styles.title, className)} {...props}>
    {children}
  </h1>
);

export const SidebarMenuIcon = ({
  icon,
  className,
  ...props
}: {
  icon: ReactElement;
  className?: string;
}) =>
  cloneElement(icon, {
    className: classNames(styles.icon, className),
    ...props,
  });

export type SidebarMenuItemProps = (
  | Partial<AnchorHTMLAttributes<HTMLAnchorElement>>
  | Partial<LiHTMLAttributes<HTMLLIElement>>
) & {
  children: ReactNode;
  active?: boolean;
  Wrapper?: any;
  to?: string;
  href?: string;
  state?: any;
  className?: string;
};

export const SidebarMenuItem = forwardRef<HTMLElement, SidebarMenuItemProps>(
  ({ children, active, Wrapper, ...props }, ref) => {
    const itemProps = {
      tabIndex: 0,
      ref,
      ...props,
      children: <div className={styles.itemTitle}>{children}</div>,
      className: classNames(props.className, styles.item, {
        [styles.active]: active,
      }),
    };
    if (Wrapper) {
      return <Wrapper {...itemProps} />;
    }
    return <li {...(itemProps as any)} />;
  }
);

SidebarMenuItem.displayName = 'SidebarMenuItem';

export type SidebarMenuListProps = ComponentPropsWithoutRef<'ul'>;

export const SidebarMenuList = ({
  children,
  className,
  ...props
}: SidebarMenuListProps) => (
  <ul className={classNames(styles.list, className)} {...props}>
    {children}
  </ul>
);

export const Sidebar = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={classNames(styles.menu, className)} {...props}>
    {children}
  </div>
);

Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuList = SidebarMenuList;
Sidebar.MenuTitle = SidebarMenuTitle;
Sidebar.MenuIcon = SidebarMenuIcon;

export default Sidebar;

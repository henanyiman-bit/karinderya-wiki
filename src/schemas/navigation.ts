export interface NavigationItemConfig {
  pageId: string;
  label?: string;
  children?: readonly NavigationItemConfig[];
}

export interface NavigationGroupConfig {
  id: string;
  items: readonly NavigationItemConfig[];
}

export interface ResolvedNavigationItem {
  pageId: string;
  label: string;
  href: string;
  children: readonly ResolvedNavigationItem[];
}

export interface ResolvedNavigationGroup {
  id: string;
  items: readonly ResolvedNavigationItem[];
}

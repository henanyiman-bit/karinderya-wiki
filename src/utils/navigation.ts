import { navigationConfig } from '../data/navigation';
import type {
  NavigationGroupConfig,
  NavigationItemConfig,
  ResolvedNavigationGroup,
  ResolvedNavigationItem,
} from '../schemas/navigation';
import { getPageById } from './registry';

const resolveItem = (
  item: NavigationItemConfig,
  groupId: string,
  seenPageIds: Set<string>,
  ancestors: Set<NavigationItemConfig>,
): ResolvedNavigationItem => {
  if (ancestors.has(item)) {
    throw new Error(`Circular navigation structure detected in group "${groupId}".`);
  }

  if ('href' in item || 'path' in item) {
    throw new Error(`Navigation item "${item.pageId}" cannot override its Registry path.`);
  }

  if (seenPageIds.has(item.pageId)) {
    throw new Error(`Duplicate navigation pageId "${item.pageId}" in group "${groupId}".`);
  }

  const page = getPageById(item.pageId);

  if (!page) {
    throw new Error(`Navigation group "${groupId}" references unknown pageId "${item.pageId}".`);
  }

  if (item.label !== undefined && item.label.trim().length === 0) {
    throw new Error(`Navigation label override for "${item.pageId}" cannot be empty.`);
  }

  const label = item.label ?? page.seo.h1;

  if (label.trim().length === 0) {
    throw new Error(`Navigation item "${item.pageId}" cannot resolve a label.`);
  }

  seenPageIds.add(item.pageId);
  const nextAncestors = new Set(ancestors).add(item);
  const children = (item.children ?? []).map((child) =>
    resolveItem(child, groupId, seenPageIds, nextAncestors),
  );

  return {
    pageId: page.id,
    label,
    href: page.path,
    children,
  };
};

export const resolveNavigation = (
  config: readonly NavigationGroupConfig[],
): readonly ResolvedNavigationGroup[] => {
  const groupIds = new Set<string>();

  return config.map((group) => {
    if (groupIds.has(group.id)) {
      throw new Error(`Duplicate navigation group id "${group.id}".`);
    }

    if (group.id.trim().length === 0) {
      throw new Error('Navigation group id cannot be empty.');
    }

    groupIds.add(group.id);
    const seenPageIds = new Set<string>();

    return {
      id: group.id,
      items: group.items.map((item) => resolveItem(item, group.id, seenPageIds, new Set())),
    };
  });
};

const resolvedNavigation = resolveNavigation(navigationConfig);

const getGroup = (id: string) => {
  const group = resolvedNavigation.find((item) => item.id === id);

  if (!group) {
    throw new Error(`Unknown navigation group "${id}".`);
  }

  return group.items;
};

const headerBrand = getGroup('header-brand')[0];

if (!headerBrand) {
  throw new Error('Header brand navigation requires one item.');
}

export const headerBrandNavigation = headerBrand;
export const headerNavigation = getGroup('header-primary');
export const footerNavigation = getGroup('footer-primary');

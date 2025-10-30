// permissions.ts

export type Permission = {
  create: string;
  read: string;
  update: string;
  delete: string;
};

export type ModulePermissions = {
  display: string;
  name: string;
  permissions: Permission;
};

export const permissions: ModulePermissions[] = [
  {
    display: "Dashboard",
    name: "dashboard",
    permissions: {
      create: "dashboard.create",
      read: "dashboard.read",
      update: "dashboard.update",
      delete: "dashboard.delete",
    },
  },
  {
    display: "Users",
    name: "users",
    permissions: {
      create: "users.create",
      read: "users.read",
      update: "users.update",
      delete: "users.delete",
    },
  },
  {
    display: "Roles",
    name: "roles",
    permissions: {
      create: "roles.create",
      read: "roles.read",
      update: "roles.update",
      delete: "roles.delete",
    },
  },
  {
    display: "Team",
    name: "team",
    permissions: {
      create: "team.create",
      read: "team.read",
      update: "team.update",
      delete: "team.delete",
    },
  },
  {
    display: "Events",
    name: "events",
    permissions: {
      create: "events.create",
      read: "events.read",
      update: "events.update",
      delete: "events.delete",
    },
  },
  {
    display: "Stories",
    name: "stories",
    permissions: {
      create: "stories.create",
      read: "stories.read",
      update: "stories.update",
      delete: "promises.delete",
    },
  },
  {
    display: "Children",
    name: "children",
    permissions: {
      create: "children.create",
      read: "children.read",
      update: "children.update",
      delete: "children.delete",
    },
  },
  {
    display: "Campaigns",
    name: "campaigns",
    permissions: {
      create: " campaigns.create",
      read: "campaigns.read",
      update: "campaigns.update",
      delete: "campaigns.delete",
    },
  },

  {
    display: "Banners",
    name: "banners",
    permissions: {
      create: "banners.create",
      read: "banners.read",
      update: "banners.update",
      delete: "banners.delete",
    },
  },
  {
    display: "Categories",
    name: "categories",
    permissions: {
      create: "categories.create",
      read: "categories.read",
      update: "categories.update",
      delete: "categories.delete",
    },
  },
  {
    display: "Settings",
    name: "settings",
    permissions: {
      create: "settings.create",
      read: "settings.read",
      update: "settings.update",
      delete: "settings.delete",
    },
  },
  {
    display: "N'osigaki",
    name: "nosigaki",
    permissions: {
      create: "nosigaki.create",
      read: "nosigaki.read",
      update: "nosigaki.update",
      delete: "nosigaki.delete",
    },
  },
  {
    display: "Blogs",
    name: "blogs",
    permissions: {
      create: "blogs.create",
      read: "blogs.read",
      update: "blogs.update",
      delete: "blogs.delete",
    },
  },
];

// Helper function to get all permission strings
export function getAllPermissions(): string[] {
  return permissions.flatMap((module) => Object.values(module.permissions));
}

// Helper function to check if a permission exists
export function isValidPermission(permission: string): boolean {
  return getAllPermissions().includes(permission);
}

// Helper to get module permissions by name
export function getModulePermissions(
  moduleName: string
): Permission | undefined {
  const module = permissions.find((m) => m.name === moduleName);
  return module?.permissions;
}

// Type for the permissions object
export type PermissionsType = {
  [K in (typeof permissions)[number]["name"]]: Permission;
};

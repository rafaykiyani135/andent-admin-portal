export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};

export const doesUserHasPermission = (
  permissionsArray,
  category,
  permissionType
) => {
  return permissionsArray.some((permission) => {
    return permission.name === category && permission.type === permissionType;
  });
};

export const groupPermissionsByName = (permissions) => {
  const groupedPermissions = {};

  permissions.forEach((permission) => {
    const { name, ...rest } = permission;

    if (!groupedPermissions[name]) {
      groupedPermissions[name] = [];
    }

    groupedPermissions[name].push(rest);
  });

  Object.keys(groupedPermissions).forEach((label) => {
    groupedPermissions[label].sort((a, b) => a.type.localeCompare(b.type));
  });

  return Object.keys(groupedPermissions).map((label) => ({
    label,
    permissions: groupedPermissions[label],
  }));
};

export const isValidNumber = (number) => {
  return RegExp(/^[0-9]+$/).test(number);
};

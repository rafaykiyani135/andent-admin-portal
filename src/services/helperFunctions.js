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

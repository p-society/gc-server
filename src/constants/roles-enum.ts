enum RolesEnum {
    USER = 1,
    ADMIN = 512,
    SUPER_ADMIN = 32768,
  }
  
  export const RolesEnumList = [
    RolesEnum.USER,
    RolesEnum.ADMIN,
    RolesEnum.SUPER_ADMIN,
  ];
  
  export default RolesEnum;
  
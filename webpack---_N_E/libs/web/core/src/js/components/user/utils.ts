import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import { UserPermissions } from "@spatialsys/js/sapi/types"

export const isUserAdmin = (user: UserData) => user.permissions.includes(UserPermissions.CAN_ACCESS_ADMIN_PAGE)

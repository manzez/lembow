import { User, UserCommunity } from './api'

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'VIEW_MEMBERS'
  | 'MANAGE_MEMBERS'
  | 'VIEW_EVENTS'
  | 'MANAGE_EVENTS'
  | 'VIEW_NOTIFICATIONS'
  | 'MANAGE_NOTIFICATIONS'
  | 'VIEW_PAYMENTS'
  | 'MANAGE_PAYMENTS'
  | 'VIEW_ANALYTICS'
  | 'MANAGE_COMMUNITIES'
  | 'MANAGE_ORGANIZATIONS'
  | 'SUPER_ADMIN_ACCESS'

export type Role = 'USER' | 'COMMUNITY_ADMIN' | 'SUPER_ADMIN'

// Define permissions for each role
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  USER: [
    'VIEW_DASHBOARD',
    'VIEW_EVENTS',
    'VIEW_NOTIFICATIONS',
    'VIEW_PAYMENTS'
  ],
  COMMUNITY_ADMIN: [
    'VIEW_DASHBOARD',
    'VIEW_MEMBERS',
    'MANAGE_MEMBERS',
    'VIEW_EVENTS',
    'MANAGE_EVENTS',
    'VIEW_NOTIFICATIONS',
    'MANAGE_NOTIFICATIONS',
    'VIEW_PAYMENTS',
    'MANAGE_PAYMENTS',
    'VIEW_ANALYTICS'
  ],
  SUPER_ADMIN: [
    'VIEW_DASHBOARD',
    'VIEW_MEMBERS',
    'MANAGE_MEMBERS',
    'VIEW_EVENTS',
    'MANAGE_EVENTS',
    'VIEW_NOTIFICATIONS',
    'MANAGE_NOTIFICATIONS',
    'VIEW_PAYMENTS',
    'MANAGE_PAYMENTS',
    'VIEW_ANALYTICS',
    'MANAGE_COMMUNITIES',
    'MANAGE_ORGANIZATIONS',
    'SUPER_ADMIN_ACCESS'
  ]
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false

  // Get the user's highest role across all communities
  const userRoles = user.communities?.map(c => c.role).filter(Boolean) || []
  const highestRole = getHighestRole(userRoles as Role[])

  if (!highestRole) return false

  return ROLE_PERMISSIONS[highestRole].includes(permission)
}

/**
 * Check if a user has a specific permission in a specific community
 */
export function hasPermissionInCommunity(
  user: User | null, 
  communityId: string, 
  permission: Permission
): boolean {
  if (!user) return false

  // Find the user's role in the specific community
  const community = user.communities?.find(c => c.id === communityId)
  if (!community || !community.role) return false

  const role = community.role as Role
  return ROLE_PERMISSIONS[role].includes(permission)
}

/**
 * Check if a user has any admin role
 */
export function isAdmin(user: User | null): boolean {
  if (!user) return false
  
  return user.communities?.some(c => 
    c.role && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
  ) || false
}

/**
 * Check if a user is a super admin
 */
export function isSuperAdmin(user: User | null): boolean {
  if (!user) return false
  
  return user.communities?.some(c => c.role === 'SUPER_ADMIN') || false
}

/**
 * Check if a user is a community admin for any community
 */
export function isCommunityAdmin(user: User | null): boolean {
  if (!user) return false
  
  return user.communities?.some(c => 
    c.role && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
  ) || false
}

/**
 * Check if a user is a community admin for a specific community
 */
export function isCommunityAdminFor(user: User | null, communityId: string): boolean {
  if (!user) return false
  
  const community = user.communities?.find(c => c.id === communityId)
  return community ? ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(community.role || '') : false
}

/**
 * Get all communities where the user has admin privileges
 */
export function getAdminCommunities(user: User | null): UserCommunity[] {
  if (!user) return []
  
  return user.communities?.filter(c => 
    c.role && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
  ) || []
}

/**
 * Get the highest role from a list of roles
 */
function getHighestRole(roles: Role[]): Role | null {
  if (roles.includes('SUPER_ADMIN')) return 'SUPER_ADMIN'
  if (roles.includes('COMMUNITY_ADMIN')) return 'COMMUNITY_ADMIN'
  if (roles.includes('USER')) return 'USER'
  return null
}

/**
 * Get user's role in a specific community
 */
export function getUserRoleInCommunity(user: User | null, communityId: string): Role | null {
  if (!user) return null
  
  const community = user.communities?.find(c => c.id === communityId)
  return community?.role as Role || null
}

/**
 * Check if user can access admin routes
 */
export function canAccessAdminRoutes(user: User | null): boolean {
  return hasPermission(user, 'MANAGE_MEMBERS') || hasPermission(user, 'SUPER_ADMIN_ACCESS')
}

/**
 * Check if user can access super admin routes
 */
export function canAccessSuperAdminRoutes(user: User | null): boolean {
  return hasPermission(user, 'SUPER_ADMIN_ACCESS')
}

/**
 * Get user's effective permissions (all permissions from their highest role)
 */
export function getUserPermissions(user: User | null): Permission[] {
  if (!user) return []

  const userRoles = user.communities?.map(c => c.role).filter(Boolean) || []
  const highestRole = getHighestRole(userRoles as Role[])

  if (!highestRole) return []

  return ROLE_PERMISSIONS[highestRole]
}
const roleList = {
  url: '/role/admin/pageRole',
  method: 'get'
}

const updateRole = {
  url: '/role/admin/updateRoleById',
  method: 'put'
}

const updateStatus = {
  url: '/role/admin/updateRoleStatusById',
  method: 'put'
}

const delRole = {
  url: '/role/admin/deleteRoleById',
  method: 'delete'
}

const createRole = {
  url: '/role/admin/createRole',
  method: 'post'
}

export default {
  roleList,
  updateRole,
  updateStatus,
  delRole,
  createRole
}
const loginServer = {
  url: '/user/admin/login.do',
  method: 'post'
}

const userList = {
  url: '/user/admin/pageUser.do',
  method: 'get'
}

const createUser = {
  url: '/user/admin/createUser.do',
  method: 'post'
}

const updateUser = {
  url: '/user/admin/updateUserById.do',
  method: 'put'
}

const delUser = {
  url: '/user/admin/deleteUserById.do',
  method: 'delete'
}

const updateStatus = {
  url: '/user/admin/updateUserStatusById.do',
  method: 'put'
}

export default {
  loginServer,
  userList,
  createUser,
  updateUser,
  delUser,
  updateStatus
}
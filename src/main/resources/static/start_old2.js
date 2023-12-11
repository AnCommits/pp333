// window.onload = async function () {
//     const responseMe = await fetch('/api/get-me')
//     if (responseMe.ok) {
//         const me = await responseMe.json()
//         putMyDataInHeader(me)
//         if (document.getElementById('header_my_roles').textContent.includes('ADMIN')) {
//             await adminPage(me.id)
//         } else {
//             putMyDataInLeftBlock(me)
//             putMyDataInRightBlock(me)
//         }
//     } else {
//         alert('Ошибка HTTP: ' + responseMe.status)
//     }
// }
//
// function putMyDataInHeader(user) {
//     let myRoles = []
//     user.roles.forEach(r => myRoles.push(r.name))
//     document.getElementById('header_my_email').textContent = user.email
//     document.getElementById('header_my_roles').textContent =
//         myRoles.toString().replaceAll(',', ', ')
// }
//
// function putMyDataInLeftBlock(user) {
//     document.getElementById('left_block_me').textContent = user.firstname + ' ' + user.lastname
// }
//
// function putMyDataInRightBlock(user) {
//     document.getElementById('right_block_id').textContent = user.id
//     document.getElementById('right_block_firstname').textContent = user.firstname
//     document.getElementById('right_block_lastname').textContent = user.lastname
//     document.getElementById('right_block_age').textContent = getAge(user.birthdate)
//     document.getElementById('right_block_email').textContent = user.email
//     putRolesIntoLiTagsAndCheckAdmin('right_block_roles', user)
// }
//
// function putRolesIntoLiTagsAndCheckAdmin(tagId, user) {
//     let hasRoleAdmin = false;
//     for (let i in user.roles) {
//         const role = user.roles[i].name
//         const tagLi = document.createElement('li')
//         tagLi.setAttribute('class', 'list-group-item p-0')
//         tagLi.setAttribute('name', 'role_user_' + user.id)
//         tagLi.textContent = role
//         document.getElementById(tagId).appendChild(tagLi)
//         // console.log(tagLi)
//         if (role === 'ADMIN') {
//             hasRoleAdmin = true
//             // tagLi.setAttribute('id', 'role_admin_' + user.id)
//         }
//     }
//     return hasRoleAdmin
// }
//
// function getAge(birthday) {
//     return birthday === null
//         ? ''
//         : ((new Date(Date.now() - new Date(birthday).getTime())).getUTCFullYear() - 1970).toString()
// }

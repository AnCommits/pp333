async function adminPage(myId) {
    document.getElementById('my_id').textContent = myId
    const responseUsers = await fetch('/admin/api/get-all-users')
    if (responseUsers.ok) {
        const users = await responseUsers.json()
        users.forEach(user => {
            putUserOnLeftBlock(user)
            putUserOnRightBlock(user, myId)
        })

        const allRoles = await loadAllRoles()
        // New user block
        createOptionTags('select_new_user_roles', allRoles)
        // Modal window
        createOptionTags('select_modal_roles', allRoles)
    } else {
        alert('Ошибка HTTP: ' + responseUsers.status)
    }
}

function putUserOnLeftBlock(user) {
    const newTegA = document.createElement('a')
    newTegA.setAttribute('class', 'nav-link')
    newTegA.setAttribute('href', '#')
    newTegA.setAttribute('onclick', 'left_block_user_click(' + user.id + ')')
    newTegA.setAttribute('id', 'left_block_user_' + user.id)
    newTegA.textContent = user.firstname + ' ' + user.lastname
    document.getElementById('left_block').appendChild(newTegA)
}

function putUserOnRightBlock(user, myId) {
    const newTr = document.createElement('tr')
    newTr.setAttribute('class', 'about_user')
    newTr.setAttribute('id', 'about_user_' + user.id)
    newTr.innerHTML = document.getElementById('right_block_user_new_user').innerHTML
        .replaceAll('new_user', user.id.toString())
    document.getElementById('right_block_users').appendChild(newTr)

    document.getElementById('user_id_' + user.id).textContent = user.id.toString()
    document.getElementById('user_firstname_' + user.id).textContent = user.firstname
    document.getElementById('user_lastname_' + user.id).textContent = user.lastname
    document.getElementById('user_birthdate_' + user.id).textContent =
        user.birthdate === null ? '' : user.birthdate.substring(0, 10)
    document.getElementById('user_age_' + user.id).textContent = getAge(user.birthdate)
    document.getElementById('user_email_' + user.id).textContent = user.email
    document.getElementById('user_password_' + user.id).textContent = user.password
    document.getElementById('user_parent_id_' + user.id).textContent = user.parentAdminId.toString()
    const userHasRoleAdmin = putRolesIntoLiTagsAndCheckAdmin('user_roles_' + user.id, user)
    document.getElementById('user_locked_' + user.id).checked = user.locked

    if (userHasRoleAdmin && !user.descendant) {
        document.getElementById('user_locked_' + user.id).disabled = true
        document.getElementById('user_delete_' + user.id).disabled = true
        if (user.id !== myId) {
            document.getElementById('user_edit_' + user.id).disabled = true
        }
    }
}

async function loadAllRoles() {
    const responseRoles = await fetch('/admin/api/all-roles')
    if (responseRoles.ok) {
        return await responseRoles.json()
    } else {
        alert('Ошибка HTTP: ' + responseRoles.status)
        return null
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createOptionTags(sel, allRoles) {
    for (let i in allRoles) {
        // const newSpan = document.createElement('span')
        // let ih = document.getElementById('span_id')
        // console.log(ih)
        // newSpan.innerHTML = ih.innerHTML
            // .replaceAll('new_role', 'allRoles[i]')
        // document.getElementById('select_modal_roles').appendChild(newSpan)
        // const tagOption = document.createElement('option')
        // tagOption.innerHTML = '<option class="option" id="option_"' + allRoles[i] + '>' + allRoles[i] + '</option>'
        // // tagOption.innerHTML = '<option class="option" id="option_' + sel + '_' + i + '" selected>' + allRoles[i] + '</option>'
        // document.getElementById(sel).appendChild(tagOption)
    }
    // console.log(document.getElementById(select_modal_roles))
}

function left_block_user_click(id) {
    const elementTrBg = document.getElementById('tr_bg')
    if (elementTrBg.textContent !== '') {
        document.getElementById('about_user_' + elementTrBg.textContent)
            .setAttribute('class', 'about_user')
    }
    elementTrBg.textContent = id
    document.getElementById('about_user_' + id).setAttribute('class', 'about_user bg-light')

    handleClick('left_block_user_' + id, true)
    document.getElementById('title2').textContent = 'О пользователе'

    document.getElementById('about_user_' + id).hidden = false
}

function left_block_admin_click() {
    const elementTrBg = document.getElementById('tr_bg')
    document.getElementById('about_user_' + elementTrBg.textContent)
        .setAttribute('class', 'about_user')

    handleClick('left_block_admin', false)
    document.getElementById('title2').textContent = 'Пользователи'
}

function handleClick(elementId, hide) {
    let links = document.getElementById('left_block').getElementsByClassName('nav-link')
    for (i in links) {
        links[i].className = 'nav-link'
    }
    document.getElementById(elementId).className = 'nav-link active disabled'
    let line = document.getElementById('right_block_users').getElementsByClassName('about_user')
    for (i in line) {
        line[i].hidden = hide
    }
    let columns = document.getElementsByClassName('admin_column')
    for (i in columns) {
        columns[i].hidden = hide
    }
}

async function lock_click(id) {
    await fetch('/admin/api/lock/' + id, {
        method: 'PUT',
        body: document.getElementById('user_locked_' + id).checked
    })
}

function new_user_click() {
    document.getElementById('users_panel').hidden = true
    document.getElementById('new_user_panel').hidden = false
}

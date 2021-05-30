import { Button, Box, Tab, Tabs } from 'grommet'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { 
    getUsers, getAdmins, disableUser, addUser, setAdmins, addAdminAC, deleteAdminAC,
    enableUser, block, unblock, removeUser, setUsers, addUserAC, deleteUserAC 
} from '../../redux/reducers/admin_reducer'
import UsersPage from './UsersPage'
import InfiniteScroll from 'react-infinite-scroll-component'


function UsersPageContainer({
    getUsers, users, admins, getAdmins, disableUser, enableUser, addAdminAC,
    block, unblock, addUser, removeUser, deleteAdminAC, deleteUserAC, addUserAC
}) {
    useEffect(() => {
        getUsers('USER')
        getAdmins('ADMIN')
    }, [])

    return <Tabs>
        <Tab title="Users">
            <InfiniteScroll
                dataLength={users.length}
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}
            >
                {
                    users.map((s) => <UsersPage
                        username={s.username}
                        userAttributes={s.userAttributes.reduce((acc, att) => {
                            acc[att.name] = att.value
                            return acc
                        }, {})}
                        enabled={s.enabled}
                        disableUser={disableUser}
                        enableUser={enableUser}
                        block={block}
                        unblock={unblock}
                        blocked={s.blocked}
                        removeUser={removeUser}
                        addUser={addUser}
                        role={s.role}
                        replace={()=>{addUser(s.username,'ADMIN').then(
                            ()=>{removeUser(s.username,'USER')}).then(
                                () => {
                                    addAdminAC(s)
                                    deleteUserAC(s)
                                    setUsers(getUsers('USER'))
                                    setAdmins(getAdmins('ADMIN'))
                                }
                            )}}
                        getUsers={getUsers}
                        getAdmins={getAdmins}
                        setAdmins={setAdmins}
                        setUsers={setUsers}
                    />)
                }
            </InfiniteScroll>
        </Tab>
        <Tab title="Administrators">
            <InfiniteScroll
                dataLength={admins.length}
                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}
            >
            {
                admins.map((s) => <UsersPage
                    username={s.username}
                    userAttributes={s.userAttributes.reduce((acc, att) => {
                        acc[att.name] = att.value
                        return acc
                    }, {})}
                    enabled={s.enabled}
                    disableUser={disableUser}
                    enableUser={enableUser}
                    block={block}
                    unblock={unblock}
                    blocked={s.blocked}
                    removeUser={removeUser}
                    addUser={addUser}
                    role={s.role}
                    replace={()=>{addUser(s.username,'USER').then(
                        ()=>{removeUser(s.username,'ADMIN')}).then(
                            () => {
                                addUserAC(s)
                                deleteAdminAC(s)
                                setUsers(getUsers('USER'))
                                setAdmins(getAdmins('ADMIN'))
                            }
                        )}}
                    getUsers={getUsers}
                    getAdmins={getAdmins}
                    setAdmins={setAdmins}
                    setUsers={setUsers}
                />)
            }
            </InfiniteScroll>
        </Tab>
    </Tabs>

}

function mapStateToProps(state) {
    return {
        users: state.admin.users,
        admins: state.admin.admins,
    }
}

export default connect(mapStateToProps, {
    getUsers, getAdmins, disableUser, removeUser, setAdmins,
    enableUser, unblock, block, addUser, setUsers,
    addUserAC, addAdminAC, deleteUserAC, deleteAdminAC
})(UsersPageContainer)
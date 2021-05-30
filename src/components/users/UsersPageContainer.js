import { Button, Box, Tab, Tabs } from 'grommet'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { 
    getUsers, getAdmins, disableUser, addUser, setAdmins,
    enableUser, block, unblock, removeUser, setUsers 
} from '../../redux/reducers/admin_reducer'
import UsersPage from './UsersPage'
import InfiniteScroll from 'react-infinite-scroll-component'


function UsersPageContainer({
    getUsers, users, admins, getAdmins, disableUser, enableUser,
    block, unblock, addUser, removeUser
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
        <Tab title="Admins">
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
    enableUser, unblock, block, addUser, setUsers
})(UsersPageContainer)
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../../AdminNavBar/AdminNavBar'

export default function AdminLayout() {
    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            <AdminNavBar />

            <Outlet />
        </div>
    )
}

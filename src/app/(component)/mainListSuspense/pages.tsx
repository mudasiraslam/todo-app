'use client'

import { Suspense } from "react";
import MainList from '../mainList/page'

function MainListPage() {
    return (
        <Suspense >
            <MainList />
        </Suspense>
    )
}

export default MainListPage
import { Suspense } from "react";
import MainList from '../mainList/page'

export default function MainListPage() {
    return (
        <Suspense >
            <MainList />
        </Suspense>
    )
}
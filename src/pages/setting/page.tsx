import { Metadata } from 'next';
import Settings from '../../app/(component)/setting/setting';

export const metadata: Metadata = {
    title: "Settings Page",
    description: "Change your Profile Pic, Name and Password.",
    openGraph: {
        title: "Settings Page - Todo App",
        description: "Change your Profile Pic, name and Password.",
    },
};

export default function SettingsPage() {
    return <Settings />;
}

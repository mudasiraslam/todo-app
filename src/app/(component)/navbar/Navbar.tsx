'use client';
import LogoIcon from '../../../../public/assets/icons/logoIcon';
function Navbar() {
    return (
        <>
            <div className="flex items-center justify-between">
                <button className={`p-2`}>
                    <LogoIcon />
                </button>
            </div>
        </>
    );
}

export default Navbar;

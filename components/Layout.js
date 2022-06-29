import Head from 'next/head';
import Link from 'next/link';

const defaultBtnProps = 'disabled:cursor-not-allowed disabled:opacity-60';

const MenuItem = ({ href, children, ...props }) => (
    <Link href={href} passHref>
        <button as="a" variant="link" className={defaultBtnProps} {...props}>
            {children}
        </button>
    </Link>
);

const Header = () => {
    return (
        <header className="p-4 bg-red-500 mb-5">
            <div className="container mx-auto flex flex-row justify-between items-center text-white">
                <div className="space-x-7 my-auto flex items-center">
                    <MenuItem href="/">
                        <h1 className="text-4xl">Not-IMDb</h1>
                    </MenuItem>
                    <MenuItem href="/search">Search</MenuItem>
                    <MenuItem href="/" disabled>
                        Watchlist
                    </MenuItem>
                    <MenuItem href="/" disabled>
                        History
                    </MenuItem>
                </div>
                <div>
                    <MenuItem
                        href="/"
                        disabled
                        className={`border-2 border-red-200 rounded-lg px-3 py-1 ${defaultBtnProps}`}
                    >
                        Watch List
                    </MenuItem>
                </div>
            </div>
        </header>
    );
};

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="h-screen">{children}</div>
        </>
    );
}

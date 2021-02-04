import React from 'react';

export default function useLoading() {
    const [isLoading, setLoading] = React.useState(false);
    const mount = React.useRef(false);

    React.useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    });

    async function load<A>(aPromise: Promise<A>) {
        setLoading(true);
        try {
            await aPromise;
        } finally {
            mount.current && setLoading(false);
        }
    }

    return [isLoading, load] as [boolean, <A>(aPromise: Promise<A>) => Promise<A>];
}
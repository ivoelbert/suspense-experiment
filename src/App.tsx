import React, { Suspense, useState } from 'react';
import { sleep } from './utils/utils';
import { suspendPromise, Suspended } from './lib/suspender';
import './App.css';

const useTransition = (React as any).useTransition;

const createRandomMessage = () => suspendPromise(sleep(2000, `Here's a random number ${Math.random()}`));
const initialResource = createRandomMessage();

interface Props {
    resource: Suspended<string>;
}

const Message: React.FC<Props> = ({ resource }) => {
    const num = resource.read();

    return <p>got message: {num}</p>;
};

const App: React.FC = () => {
    const [resource, setResource] = useState(initialResource);

    const [startTransition, isPending] = useTransition({
        timeoutMs: 3000,
    });

    const onClick = () => {
        startTransition(() => setResource(createRandomMessage()));
    };

    return (
        <div className="App">
            <p>nice</p>

            <Suspense fallback={<p>loading message...</p>}>
                <Message resource={resource} />
            </Suspense>

            <button onClick={onClick} disabled={isPending}>New message</button>
        </div>
    );
};

export default App;

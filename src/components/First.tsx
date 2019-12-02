import React, { Suspense } from 'react';
import { Suspended } from '../lib/suspender';

interface Props {
    message: string;
    data: Suspended<number>;
}

const First: React.FC<Props> = props => {
    const { data, message } = props;

    const num: number = data.read();

    return (
        <div>
            <p>message is {message}</p>
            <Suspense fallback={<p>number is loading...</p>}>
                <p>number is {num}</p>
            </Suspense>
        </div>
    );
};

export default First;

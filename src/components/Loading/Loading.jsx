import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../../lotties/loading.json'

export default function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <Lottie
                options={defaultOptions}
                height={1000}
                width={400}
            />
        </div>
    );
}

import React from 'react';
import { ClipLoader } from 'react-spinners';
import './css/LoadingOverlay.css';

const Loading = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <ClipLoader size={50} color={"#fff"} />
        </div>
    );
};

export default Loading;

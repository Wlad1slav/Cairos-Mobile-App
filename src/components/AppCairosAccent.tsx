import React from "react";

import cairos from "../config/cairos-philosophy.config";
import getWeekDay from "../utils/datetime.getWeekDay";

import './AppCairosAccent.scss';

const AppCairosAccent: React.FC = () => {

    const dayNumber = getWeekDay();

    return (
        <div className='cariros-accent'>
            <div className="short-info">
                <span>
                    ( {cairos[dayNumber].symbol} )
                </span>
                <h1>
                    {cairos[dayNumber].name}
                </h1>
            </div>

            <p className="description">
                {cairos[dayNumber].description}
            </p>
        </div>
    );
}

export default AppCairosAccent;
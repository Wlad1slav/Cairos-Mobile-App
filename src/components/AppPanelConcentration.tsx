import React from "react";
import {IonButton} from "@ionic/react";

import './AppPanelConcentration.scss';

const AppPanelConcentration: React.FC = () => {
    return (
        <div className='panel--concentration'>
            <h2>Рівень концентраії</h2>
            <div className="blocks">
                <div className="item">
                    <p className="accent">32 хв.</p>
                    <p>до наступної години</p>
                </div>

                <div className="item middle">
                    <p className='accent'>9</p>
                    <p>це гарно</p>
                </div>

                <div className="item">
                    <IonButton
                        color={'tertiary'}
                        size={'small'}
                        shape="round"
                        fill="outline"
                    >
                        Встановити
                    </IonButton>
                </div>
            </div>
        </div>
    );
}

export default AppPanelConcentration;
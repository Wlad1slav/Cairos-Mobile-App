import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";

import './AppPanelProgressWeek.scss';
import loadLocalization from "../../lang/index.localization";
import appConfig from "../../config/app.config";
import getWeekDay from "../../utils/datetime.getWeekDay";

const AppPanelProgressWeek: React.FC = () => {

    const [localization, setLocalization] = useState<any>(null);

    const dayNumber = getWeekDay();

    useEffect(() => {
        const loadLoc = async () => {
            const loc = await loadLocalization(appConfig.language);
            setLocalization(loc.default);
        };
        loadLoc();
    }, []);

    if (!localization) {
        return <div>Завантаження...</div>; // Show a loading state while localization is being loaded
    }

    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="panel--progress-week">
            <div className="progress">
                {daysOfWeek.map((number) => (
                    <p
                        key={number}
                        className={`${dayNumber === number ? 'today' : ''} ${dayNumber <= number ? 'left' : ''}`}
                    >
                        •
                    </p>
                ))}
            </div>
            <div className="dayer">
                <b>{localization.daysOfWeek[dayNumber as keyof typeof localization.daysOfWeek]}</b>
                <IonIcon icon={arrowForward} />
                <p>
                    {localization.untilEndOfWeek(dayNumber)}
                </p>
            </div>
        </div>
    );
};

export default AppPanelProgressWeek;

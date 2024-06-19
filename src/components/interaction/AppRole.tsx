import React from "react";

import './AppRole.scss';

const AppRole: React.FC = () => {
    return (
        <div className='role'>
            <h3>Назва ролі</h3>
            <ul>
                <li>Пункт 1</li>
                <li>Пункт 2</li>
                <li>Пункт 3</li>
            </ul>
        </div>
    );
}

export default AppRole;
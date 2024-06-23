import React from "react";

import './MyRoleForWeek.scss';

const MyRoleForWeek: React.FC<Readonly<RoleModel>> = ({role, parts}) => {
    return (
        <div className='my-role-for-week'>
            <h3>{role}</h3>

            <div className="parts">
                {
                    parts?.map((part) =>{
                        return <p key={part} className='part'>{part}</p>;
                    })
                }
            </div>
        </div>
    );
}

export default MyRoleForWeek;
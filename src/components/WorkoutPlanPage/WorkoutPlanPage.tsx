import React from 'react';
import {useParams} from 'react-router-dom';

const WorkoutPlanPage = () => {
    let {plan} = useParams<{ plan: string }>();
    return <p>Workout Page for {plan}</p>
}

export {WorkoutPlanPage};
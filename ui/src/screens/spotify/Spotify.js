import React from 'react';
import {
    Card, CardContent,
} from '@material-ui/core';
import Recommendations from './components/Recommendations';
import MainScreen from './wrappers/MainScreen';

export default () => (
    <MainScreen>
        <Card>
            <CardContent>
                <Recommendations />
            </CardContent>
        </Card>
    </MainScreen>
);

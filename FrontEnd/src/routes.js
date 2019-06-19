import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './Pages/Feed.js';
import New from './Pages/New.js';

function Routes (){
    return (
        <Switch>
            <Route path='/' exact component={Feed} />
            <Route path='/New' component={New} />
        </Switch>
    )
}

export default Routes;
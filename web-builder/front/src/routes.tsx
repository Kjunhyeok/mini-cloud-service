import { useRoutes } from 'react-router-dom';
import Admin from "./Admin";
import View from "./View";

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '', element: <View />},
                { path: 'admin', element: <Admin />},
                { path: ':page/admin', element: <Admin />},
                { path: ':page', element: <View />},
            ]
        }
    ]);
}

export default Routes;
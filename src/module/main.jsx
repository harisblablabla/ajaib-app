import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Navigation} from 'react-minimal-side-navigation';

import React, {Suspense} from 'react'
import {Routes,Route, useNavigate} from "react-router-dom";
const Home = React.lazy(() => import('./home'))
const ReksaDana = React.lazy(() => import('./reksa'))

export default function Main() {

    const navigate = useNavigate()

    return(
        <Suspense fallback={<h3>loading...</h3>}>
        <Navigation
            activeItemId="/"
            onSelect={({itemId}) => {
                navigate(itemId)
            }}
            items={[
              {
                title: 'Home',
                itemId: '/',
              },
              {
                title: 'Reksa Dana',
                itemId: '/reksa-dana',
              }
            ]}
        />
           <div className='main'>
                    <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/reksa-dana" element={<ReksaDana/>} />
                    </Routes>
            </div>
        </Suspense>
    )
}
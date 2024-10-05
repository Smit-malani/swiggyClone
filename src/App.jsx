import { useEffect, useState } from 'react'
import './App.css'
import Head from './componenets/Head'
import Body from './componenets/Body'
import { Route, Routes } from 'react-router-dom'
import RestorentMenu from './componenets/RestorentMenu'
import { CartContext, Coordinates, Visibility } from './context/contextApi'
import Cart from './componenets/Cart'
import { useSelector } from 'react-redux'
import Search from './componenets/Search'


function App() {
  const[coord,setCoord]=useState({lat:23.022505 ,lng:72.5713621 })
  const visible = useSelector((state => state.toogleSlice.searchBarToogle))
  const loginVisible = useSelector((state) => state.toogleSlice.loginTooggle)


  return (
      <Coordinates.Provider value={{coord,setCoord}}>
          <div className={visible || loginVisible ? "overflow-hidden max-h-screen" : ""}> 
            <Routes>
              <Route path='/' element={<Head/>}>
                <Route path='/' element={<Body/>}/>
                <Route path='/restaurantMenue/:id' element={<RestorentMenu/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='*' element={<h1>cooming soon</h1>}/>
              </Route>
            </Routes>
          </div>
      </Coordinates.Provider>
  )
}

export default App
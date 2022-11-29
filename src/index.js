import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';





import EventDetail from './component/Events/EventDetail';

import IndexAdmin from './admin';
import AllEventsAdmin from './admin/Event';
import EventAdminDetail from './admin/EventAdminDetail';


import Account from './component/account';
import Login from './component/account/loggin';
import Register from './component/account/resgister';
import AdminContact from './admin/Contact';

import City from './admin/city';
import NewProduct from './admin/addNewProduct';
import AddNewGiftCode from './admin/addNewGiftCode';
import BillList from './admin/billList';
import BillDetail from './admin/billDetail';
import AllAdmin from './admin/allAdmin';
import AllUser from './admin/allUser';
import UpdateUser from './admin/updateUser';
import AllProducts from './component/Product/Products';
import { 
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider, } from 'react-query';
import ProductDetail from './component/Product/ProductDetail';
import Genres from './component/Genres/Genres';
import GenresDetail from './component/Genres/Genres_Detail';
import CreateGenres from './component/Genres/Create_Genres';
import Bill from './component/Bill/bill';

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  
    <Routes >
   
 
      <Route path='/'  element = {<App/>}>
          <Route path='' element={<Account></Account>}>
      
            <Route index element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
        
          </Route>
          <Route path='adminPhobendoi' element={<IndexAdmin></IndexAdmin>} >
                <Route path="EventAdmin" element={<AllEventsAdmin></AllEventsAdmin>} >
                </Route>
                <Route path='thisUser/:userID' element={<UpdateUser></UpdateUser>}></Route>
                <Route path="createUser" element={<Register></Register>} >
                </Route>
                <Route path="allAdmin" element={<AllAdmin></AllAdmin>} >
                </Route>
                <Route path="allProducts" element={<AllProducts></AllProducts>} >
                </Route>
                <Route path="allUser" element={<AllUser></AllUser>} >
                </Route>
                <Route path="ContactAdmin" element={<AdminContact></AdminContact>} >
                </Route>
                <Route path=':eventID' element={<EventAdminDetail></EventAdminDetail>}></Route>
                <Route path="city" element={<City></City>} >
                </Route>
                <Route path="newProduct" element={<NewProduct></NewProduct>} ></Route>
                <Route path="new_giftcode" element={<AddNewGiftCode></AddNewGiftCode>} ></Route>
                <Route path="bill" element={<Bill></Bill>} >
                </Route>
                <Route path="thisbill/:billID" element={<BillDetail></BillDetail>} ></Route>
                <Route path="thisproduct/:productID" element={<ProductDetail></ProductDetail>} ></Route>
                <Route path="genres" element={<Genres></Genres>} >
                </Route>
                <Route path="create_genres" element={<CreateGenres></CreateGenres>} >
                </Route>
                  <Route path='thisGenres/:genresId' element={<GenresDetail></GenresDetail>}></Route>
          </Route>
            
         

              <Route path='event/:eventID' element={<EventDetail></EventDetail>}  ></Route>

        
      </Route >

       
        </Routes>  

    </BrowserRouter>
    </QueryClientProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

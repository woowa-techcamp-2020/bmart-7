import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { client } from './ApolloClient'
import { ApolloProvider } from 'react-apollo'
import '@/styles/reset.scss'
import '@/styles/base.scss'
import '@/styles/fonts.scss'
import { StoreContext, SetStoreContext, StoreType, defaultStore, InitStore } from '@/store'
import { SidePage } from './pages/SidePage'
import {
  LoginPage,
  FavoritePage,
  MainCategoryPage,
  TestPage,
  MainPage,
  CategoryPage,
  SearchResultPage,
  SearchPage,
} from './pages'
import { CartPage } from './pages/CartPage'
import { DetailPage } from './pages/DetailPage'
import { OrderPage } from './pages/OrderPage'

function App() {
  const [store, setStoreOrigin] = useState<StoreType>(defaultStore)

  const setStore = useCallback((newStore: StoreType) => {
    setStoreOrigin(newStore)
  }, [])

  return (
    <ApolloProvider client={client}>
      <StoreContext.Provider value={store}>
        <SetStoreContext.Provider value={setStore}>
          <Router>
            <Switch>
              <div id="app">
                <Route path="/login" exact component={LoginPage} />
                {store.isLoading ? (
                  <InitStore />
                ) : (
                  <>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/category/:id" exact component={CategoryPage} />
                    <Route path="/main/category/:id" exact component={MainCategoryPage} />
                    <Route path="/side" exact component={SidePage} />
                    <Route path="/favorite" exact component={FavoritePage} />
                    <Route path="/search/result/:q" exact component={SearchResultPage} />
                    <Route path="/search" exact component={SearchPage} />
                    <Route path="/cart" exact component={CartPage} />
                    <Route path="/order" exact component={OrderPage} />
                    <Route path="/test" exact component={TestPage} />
                    <Route path="/detail/:id" exact component={DetailPage} />
                  </>
                )}
                <Redirect to="/" />
              </div>
            </Switch>
          </Router>
        </SetStoreContext.Provider>
      </StoreContext.Provider>
    </ApolloProvider>
  )
}

export default App

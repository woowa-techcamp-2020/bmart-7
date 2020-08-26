import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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

function App() {
  const [store, setStore] = useState<StoreType>(defaultStore)

  return (
    <ApolloProvider client={client}>
      <StoreContext.Provider value={store}>
        <SetStoreContext.Provider value={setStore}>
          <Router>
            <div id="app">
              {store.isLoading ? (
                <InitStore />
              ) : (
                <>
                  <Route path="/" exact component={MainPage} />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/category/:id" exact component={CategoryPage} />
                  <Route path="/main/category/:id" exact component={MainCategoryPage} />
                  <Route path="/side" exact component={SidePage} />
                  <Route path="/favorite" exact component={FavoritePage} />
                  <Route path="/search/result/:q" exact component={SearchResultPage} />
                  <Route path="/search" exact component={SearchPage} />
                  <Route path="/test" exact component={TestPage} />
                </>
              )}
            </div>
          </Router>
        </SetStoreContext.Provider>
      </StoreContext.Provider>
    </ApolloProvider>
  )
}

export default App

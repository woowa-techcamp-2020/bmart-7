import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { client } from './ApolloClient'
import { ApolloProvider } from 'react-apollo'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { FavoritePage } from '@/pages/FavoritePage'
import '@/styles/reset.scss'
import '@/styles/base.scss'
import '@/styles/fonts.scss'
import { MainPage } from './pages/MainPage'
import { StoreContext, SetStoreContext, StoreType, globalStore } from '@/store'
import { TestPage } from './pages/TestPage'
import { CategoryPage } from './pages/CategoryPage'

function App() {
  const [store, setStore] = useState<StoreType>(globalStore)

  return (
    <ApolloProvider client={client}>
      <StoreContext.Provider value={store}>
        <SetStoreContext.Provider value={setStore}>
          <Router>
            <div id="app">
              <Route path="/" exact component={MainPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/category/:id" exact component={CategoryPage} />
              <Route path="/favorite" exact component={FavoritePage} />
              <Route path="/test" exact component={TestPage} />
            </div>
          </Router>
        </SetStoreContext.Provider>
      </StoreContext.Provider>
    </ApolloProvider>
  )
}

export default App

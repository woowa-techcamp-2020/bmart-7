import React, { useEffect } from 'react'
import { SocialLoginBtn } from '@/components/Login/SocialLoginBtn'
import './style.scss'
import axios from 'axios'
import queryParser from 'query-parser-url'
import { socialSites } from './config'

export const Login = () => {
  useEffect(() => {
    const url = window.location.search.substring(1)

    const queryObject = queryParser(url)
    const code = queryObject['code']
    if (!code) return

    axios.get(`/api/github-login/?code=${code}`).then((res) => {
      localStorage.setItem('token', res.data.token)
    })
  }, [])

  return (
    <div className="login-section">
      <img className="logo" src="./images/bmartlogo.jpeg" />
      <div className="social-login-wrap">
        {socialSites.map((site) => {
          return <SocialLoginBtn {...site} />
        })}
        <div className="social-login-title">click social login</div>
      </div>
    </div>
  )
}

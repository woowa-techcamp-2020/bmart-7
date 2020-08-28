import React, { useEffect } from 'react'
import { SocialLoginBtn } from '@/components/Login/SocialLoginBtn'
import './style.scss'
import axios from 'axios'
import queryParser from 'query-parser-url'
import { socialSites } from './config'
import { useMutation } from 'react-apollo'
import { INSERT_USER } from './gql'

export const Login = () => {
  const [createUser] = useMutation(INSERT_USER)

  useEffect(() => {
    const url = window.location.search.substring(1)

    const queryObject = queryParser(url)
    const code = queryObject['code']
    if (!code) return

    axios.get(`/api/github-login/?code=${code}`).then((res) => {
      localStorage.setItem('token', res.data.token)
      // router 적용 필요
      window.location.href = '/'
    })
  }, [])

  const freeLogin = async () => {
    const {
      data: { insertUser },
    } = await createUser({
      variables: {
        input: {
          id: 0,
          userId: '',
        },
      },
    })
    localStorage.setItem('token', `guest-${insertUser.id}`)
    window.location.href = '/'
  }

  return (
    <div className="login-section">
      <div className="login-wrapper">
        <img className="logo" src="./images/bmart-logo.png" alt="logo" />
        <article>
          <p>우아한 테크캠프 7팀</p>
          <p>김영지·박지환·최범수</p>
        </article>
        <div className="social-login-wrap">
          {socialSites.map((site, index) => {
            return <SocialLoginBtn {...site} key={index} />
          })}
        </div>
        <div className="free-login-button" onClick={() => freeLogin()}>
          간편 로그인 For Demo
        </div>
      </div>
    </div>
  )
}

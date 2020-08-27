const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
const BASE_URL = process.env.REACT_APP_BASE_URL

export const socialSites = [
  {
    icon: 'github',
    text: 'Login with Github',
    href: `https://github.com/login/oauth/authorize/?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${BASE_URL}/login`,
  },
]

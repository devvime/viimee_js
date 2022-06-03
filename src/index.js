import _ from 'lodash'
import Router from './core/Router'
import Home from './components/home/home'
import Posts from './components/posts/posts'

const routes = [
  { path: "/", view: Home },
  { path: "/posts", view: Posts },
  { path: "/posts/:id", view: Posts }
]

new Router(routes)
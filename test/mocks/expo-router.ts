const replace = () => undefined
const push = () => undefined
const back = () => undefined

function useRouter() {
  return {
    replace,
    push,
    back,
  }
}

function Redirect() {
  return null
}

export { Redirect, useRouter }

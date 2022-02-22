import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { req, createComponent, create } from '@rdeco/web-app-sdk'

const userModule = req('@hrss-component/hrss-data-model/user-module')

test('测试 request API', async () => {
  create({
    name: '@hrss-component-hrss-data-model/user-module',
    exports: {
      login(userInfo, resolve, reject) {
        if (userInfo.name === 'admin') {
          resolve('success')
        } else {
          reject('faild')
        }
      },
    },
  })
  const Test = createComponent({
    name: 'test',
    controller: {
      async onMount() {
        try {
          const res = await userModule.login({ name: 'admin' })
          expect(res).toBe('success')
        } catch (error) {
          expect(error).toBe('faild')
        }
      },
    },
    view: {
      render() {
        return <div></div>
      },
    },
  })

  render(<Test></Test>)
})

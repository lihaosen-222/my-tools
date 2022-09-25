import 'antd/dist/antd.css' // vite 的自定义导入不好用，漏了挺多
import './App.less'
import { io } from 'socket.io-client'
import { Input, message } from 'antd'
import Card from './components/Card'
import { getTodayStatus, getWinStatus, setBackground } from './service'
import { useRequest } from 'ahooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

const socket = io()

function App() {
  const [win, setWin] = useState([])

  const winRender = useMemo(() => {
    return win.map((item: any, index: number) => {
      return (
        <div key={index}>
          {index}:{' '}
          {item?.hwnd ? (
            <>
              绑定 <b>{item?.name}</b>
            </>
          ) : (
            '暂未绑定'
          )}
        </div>
      )
    })
  }, [win])

  const { data: todayStatus, loading: signInLoading } = useRequest(async () => {
    const res = await getTodayStatus()
    return res?.data?.data
  })

  const { run, loading: winLoading } = useRequest(
    async () => {
      const res = await getWinStatus()
      const list = res?.data || []
      setWin(list)
    },
    {
      manual: true,
    }
  )

  const runSetBackground = useCallback(async function(e: any){
    await setBackground(e.target.value)
    message.success('修改成功!')
  },[])


  // 之后添加一个 clean up 函数
  useEffect(() => {
    socket.on('update-win', (list) => {
      setWin(list)
    })
    run()
  }, [run])

  type serachType = 'bing' | 'baidu' | 'google' | 'juejin'
  function onSearch(type: serachType) {
    let baseUrl = ''
    switch (type) {
      case 'bing':
        baseUrl = 'https://www.bing.com/search?q='
        break
      case 'baidu':
        baseUrl = 'https://www.baidu.com/s?wd='
        break
      case 'google':
        baseUrl = 'https://www.google.com/search?q='
        break
      case 'juejin':
        baseUrl = 'https://juejin.cn/search?query='
        break
    }

    return function (e: any) {
      window.location.href = baseUrl + e.target.value
    }
  }

  return (
    <div className="App">
      <Card title="搜索" className="search">
        <div className="input-wrapper">
          <Input
            prefix="bing"
            autoFocus
            onPressEnter={onSearch('bing')}
          />
        </div>
        <div className="input-wrapper">
          <Input
            prefix="juejin"
            onPressEnter={onSearch('juejin')}
          />
        </div>
        <div className="input-wrapper">
          <Input
            prefix="baidu"
            onPressEnter={onSearch('baidu')}
          />
        </div>
        <div className="input-wrapper">
          <Input
            prefix="google"
            onPressEnter={onSearch('google')}
          />
        </div>
      </Card>
      <Card title="掘金签到" className="signIn" loading={signInLoading}>
        今日
        {todayStatus ? '已' : '未'}
        签到
      </Card>
      <Card title="界面热键" className="winHotKey" loading={winLoading}>
        {winRender}
      </Card>
      <Card title="更改当日背景">
          <Input
            prefix="输入 URL"
            onPressEnter={runSetBackground}
          />
      </Card>
    </div>
  )
}

export default App

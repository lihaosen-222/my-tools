// import 'antd/dist/antd.css'
import "antd/lib/skeleton/style/index.less"
import "./App.less"
import { io } from "socket.io-client"
import { Card, Input } from "antd"
import { getTodayStatus, getWinStatus } from "./service"
import { useRequest } from "ahooks"
import { useEffect, useMemo, useState } from "react"
import 'antd/es/button/style/index.css'

const socket = io()

function App() {
  const [win, setWin] = useState([])

  const winRender = useMemo(() => {
    return win.map((item: any, index: number) => {
      return (
        <div key={index}>
          {index}:{" "}
          {item?.hwnd ? (
            <>
              绑定 <b>{item?.name}</b>
            </>
          ) : (
            "暂未绑定"
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

  // 之后添加一个 clean up 函数
  useEffect(() => {
    socket.on("update-win", (list) => {
      setWin(list)
    })
    run()
  }, [])

  type serachType = 'bing' | 'baidu' | 'google'
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
    }

    return function (content: string){
      window.location.href = baseUrl + content
    }
  }

  return (
    <div className="App">
      <Card title="搜索" className="search">
        <div className="input-wrapper">
          <Input.Search prefix='bing' enterButton={true} onSearch={onSearch('bing')}/>
        </div>
        <div className="input-wrapper">
          <Input.Search prefix='baidu' enterButton={true} onSearch={onSearch('baidu')}/>
        </div>
        <div className="input-wrapper">
          <Input.Search prefix='google' enterButton={true} onSearch={onSearch('google')}/>
        </div>
      </Card>
      <Card title="掘金签到" className="signIn" loading={signInLoading}>
        今日
        {todayStatus ? "已" : "未"}
        签到
      </Card>
      <Card title="界面热键" className="winHotKey" loading={winLoading}>
        {winRender}
      </Card>
    </div>
  )
}

export default App

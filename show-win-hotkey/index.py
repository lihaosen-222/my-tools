import keyboard
import win32gui
import pythoncom
from win32.lib import win32con
from win32com import client
import time
import httpx
import asyncio
import json

host = 'http://81.68.226.188:8007'

# 生成防抖函数
def get_debounce_fn(fn, break_time):
    ref = {'pre_time': 0}
    def debounce_fn(*a):
        now = time.time()
        if now - ref['pre_time'] > break_time:
            fn(*a)
        ref['pre_time'] = now
        
    return debounce_fn

# 注册异步请求
async def set_win(win):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            host + '/api/setWin',
            data={'win': json.dumps(win)}  # 转 json
        )
        result = resp.text
        print(result)
loop = asyncio.new_event_loop()
# loop = asyncio.get_event_loop()

# alt_shift 回调函数
def alt_shift(win, i):
    win[i]['hwnd'] = win32gui.GetForegroundWindow()
    win[i]['name'] = win32gui.GetWindowText(win[i]['hwnd'])
    print('绑定', win[i]['name'])

    # 异步执行请求
    loop.run_until_complete(set_win(win))

# alt 回调函数
def alt(win, i):
    if(not win[i]['hwnd']): 
        return

    if win32gui.IsIconic(win[i]['hwnd']):
        win32gui.ShowWindow(win[i]['hwnd'], win32con.SW_SHOWNORMAL) # 最小化的时候显示到最前
    else:
        # 这四行不加 SetForegroundWindow 会报错，原理我也不知道
        win32gui.BringWindowToTop(win[i]['hwnd'])
        pythoncom.CoInitialize()
        shell = client.Dispatch("WScript.Shell")
        shell.SendKeys('%')
        win32gui.SetForegroundWindow(win[i]['hwnd']) # 没最小化的时候显示到最前
    print('显示', win[i]['name'] )

# 生成防抖函数
def get_debounce_fn(fn, break_time):
    ref = {'pre_time': 0}
    def debounce_fn(*a):
        now = time.time()
        if now - ref['pre_time'] > break_time:
            fn(*a)
        ref['pre_time'] = now
        
    return debounce_fn

# 生成 alt 回调的防抖函数
alt_throttle = get_debounce_fn(alt, 0.1)

# win 初始化， 注册事件
win = [None]
for i in range(1, 6):
    win.append({'hwnd': '', 'name':''})
    keyboard.add_hotkey('alt+'+str(i), alt_throttle, (win,i))
    keyboard.add_hotkey('alt+shift+'+str(i), alt_shift, (win,i))

# alt+shift+q 停止监听
keyboard.wait('alt+shift+q')

input('Press Enter to exit…')



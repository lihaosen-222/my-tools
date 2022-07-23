<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [功能](#%E5%8A%9F%E8%83%BD)
- [使用](#%E4%BD%BF%E7%94%A8)
  - [安装依赖](#%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)
  - [快捷键](#%E5%BF%AB%E6%8D%B7%E9%94%AE)
- [其他](#%E5%85%B6%E4%BB%96)
- [个人笔记](#%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 功能
绑定窗口后，通过快捷键呼出窗口


# 使用
## 创建虚拟环境
```virtualenv venv```

## 安装依赖
```pip install -r requirements.txt```

## 打包
``` pyinstaller -D index.py ```

## 快捷键
alt + shitf + 1-5 绑定当前最前的窗口

alt + 1-5 显示窗口

# 其他
快写完了才发现，不应该用 keyboard 的 keyboard，应该直接向 windows 直接注册快捷键，而且 windows 自带了相似功能的快捷键， win + 1-9

# 个人笔记
virtualenv venv

pip freeze > requirements.txt

pip install -r requirements.txt

Snake Case 下划线命名法

pyinstall -D index.py 


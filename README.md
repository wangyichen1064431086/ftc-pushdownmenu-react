# ftc-pushdownmenu-react
[![](https://travis-ci.org/wangyichen1064431086/ftc-pushdownmenu-react.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-pushdownmenu-react)

<!-- MARKDOWN 插图基础格式： [![Alt text](图片链接)](点击图片后跳转链接) -->

The pushdown menu component for FTC. React version. It is a part of  ftc-header-react.

## Install
```
cd yourProject
npm install react react-dom prop-types
npm install "@ftchinese/ftc-pushdownmenu-react" --save 
```

## Usage
Example:
```
import {PushdownMenu, PushdownItem} from '@ftchinese/ftc-pushdownmenu-react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <PushdownMenu>
    <PushdownItem name={"简体中文"} url={"#"} selected={true} />
    <PushdownItem name={"繁体中文"} url={"http://big5.ftchinese.com/"} />
    <PushdownItem name={"英文"} url={"https://www.ft.com/"} />
  </PushdownMenu>,
  document.getElementById('root')
);
```

## Props
### Props of PushdownMenu
#### children
Must be a or an array of PushdownItem

###  Props of PushdownItem

#### name
Type string. Required. The name of the list item.

#### url
Type string. Optional. Default '#'. The url site to which you jump when clicking the list item.


#### selected
Type boolean. Required. Decide the item is shown or not when the pushdown menu is shrinked. That's to say, the item with prop selected = {true} will be shown on the top of the menu, and it is only shown when the menu is shrinked.
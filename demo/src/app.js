import {PushdownMenu, PushdownItem} from '../../src/js/PushdownMenu';
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
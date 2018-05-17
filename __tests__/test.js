jest.unmock('../src/js/PushdownMenu');//指示模块系统不应从require（）返回指定模块的模拟版本（例如，它应始终返回实模块）。


//jest会自动mock模拟依赖包，所以真实的要测试的文件要unmock

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import {PushdownMenu, PushdownItem} from '../src/js/PushdownMenu.js';

describe('Build a Pushdown Menu', () => {
  it('render', () => {
    const pushdownMenu = ReactTestUtils.renderIntoDocument(
      <PushdownMenu>
        <PushdownItem name={"简体中文"} url={"#"} selected={true} />
        <PushdownItem name={"繁体中文"} url={"http://big5.ftchinese.com/"} />
        <PushdownItem name={"英文"} url={"https://www.ft.com/"} />
      </PushdownMenu>
    );
    const pushdownMenuNode = ReactDOM.findDOMNode(pushdownMenu);

    expect(pushdownMenuNode).toBeInstanceOf(HTMLElement);
    expect(pushdownMenuNode.querySelector('ul').className.includes('menu-list')).toBeTruthy;
    expect(pushdownMenuNode.querySelectorAll('ul li').length).toBe(3);
    expect(pushdownMenuNode.querySelector('ul li').className.includes('menu-item'));
  });

  it('Toggle', () => {
    const pushdownMenu = ReactTestUtils.renderIntoDocument(
      <PushdownMenu>
        <PushdownItem name={"简体中文"} url={"#"} selected={true} />
        <PushdownItem name={"繁体中文"} url={"http://big5.ftchinese.com/"} />
        <PushdownItem name={"英文"} url={"https://www.ft.com/"} />
      </PushdownMenu>
    );
    const pushdownMenuNode = ReactDOM.findDOMNode(pushdownMenu);
    const firstItem = pushdownMenuNode.querySelector('ul li');
    expect(firstItem.className.includes('hide')).toBeFalsy;
    expect(pushdownMenuNode.querySelector('ul li:nth-child(2)').className.includes('hide')).toBeTruthy;
    expect(pushdownMenuNode.querySelector('ul li:nth-child(3)').className.includes('hide')).toBeTruthy;

    ReactTestUtils.Simulate.click(firstItem);

    expect(pushdownMenuNode.querySelector('ul li:nth-child(2)').className.includes('hide')).toBeFalsy;
    expect(pushdownMenuNode.querySelector('ul li:nth-child(3)').className.includes('hide')).toBeFalsy;

    ReactTestUtils.Simulate.click(firstItem);
    expect(pushdownMenuNode.querySelector('ul li:nth-child(2)').className.includes('hide')).toBeTruthy;
    expect(pushdownMenuNode.querySelector('ul li:nth-child(3)').className.includes('hide')).toBeTruthy;

  });

});
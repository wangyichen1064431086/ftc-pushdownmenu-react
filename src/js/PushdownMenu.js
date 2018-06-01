import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import pushdownmenu from '../scss/pushdownmenu.scss';//如果省略.scss，虽然在webpack构建本地测试环境时该文件找得到，但是在rollup构建生产环境时该文件找不到。

@CSSModules(pushdownmenu, {allowMultiple: true})
class PushdownMenu extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  constructor(props) {
    super(props);
    this.state = {
      showPushdown: false,
    };
    this.clickToPushdownOrShrink = this.clickToPushdownOrShrink.bind(this);
  }

  clickToPushdownOrShrink(e) {
    e.preventDefault();
    this.setState(prevState => {
      return{
      showPushdown: !prevState.showPushdown //这里一定要在{}外再加一层()，是表示返回的意思
    }});
  }
  renderList() {
    const lists = this.props.children;
    let findSelected = false;
    let firstItem;
    React.Children.forEach(lists, list => {
      if (!findSelected && list.props.selected) {
        firstItem = React.cloneElement(list, {
          handleClick: this.clickToPushdownOrShrink,
          key: list.props.name,
          className:'menu-item'
        });
        findSelected = true;
      }
    });
    if(!findSelected) {//每个item都没有提供selected={true}，那么默认第一个为selected
      firstItem = React.cloneElement(lists[0], {
        selected: true,
        handleClick: this.clickToPushdownOrShrink,
        key: list.props.name,
        className:'menu-item'
      });
    }
   
    const otherItems = React.Children.map(lists, list => {
      if (list.props.name === firstItem.props.name) {
        return null
      } else {
        return React.cloneElement(list, {
          selected:false,
          handleClick: null,
          key: list.props.name,
          className: classnames({
            "menu-item":true,
            "hide": !this.state.showPushdown
          })
        })
      }
    });

    return (
      <ul styleName = "menu-list">
        { firstItem }
        { otherItems }
      </ul>
    )
  }
  render() {
    const {showPushdown} = this.state;
    const style = classnames({
      "menu": true,
      "pushdown": showPushdown
    });
    return (
      <div styleName = {style} >
        {this.renderList()}
      </div>
    )
  }
}

@CSSModules(pushdownmenu, {allowMultiple:true})
class PushdownItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func,
  }

  static defaultProps = {
    selected: true, //父元素传递进来的selected可以把默认selected覆盖
    className:"menu-item",
    url:"#"
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {name, url, selected, handleClick, className} = this.props;

    //const realHandleClick = (handleClick && selected) ? handleClick : null; //只有同时满足handleClick不为null且selected为true，才绑定handleClick

    return (
      <li styleName={className} onClick={handleClick}>
        <a href={url} >
          {name}
        </a>
      </li>
    )
  }
}

export  {PushdownMenu, PushdownItem};
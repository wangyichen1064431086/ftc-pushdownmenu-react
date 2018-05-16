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
      pushdown: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => {
      pushdown: !prevState.pushdown
    })
  }
  renderList() {
    const lists = this.props.children;
    let findSelected = false;
    let firstItem;
    React.Children.forEach(lists, list => {
      if (!findSelected && list.props.selected) {
        firstItem = React.cloneElement(list, {
          handleClick: this.handleClick,
          key: list.props.name
        });
        findSelected = true;
      }
    });
    console.log(firstItem);
   
    const otherItems = React.Children.map(lists, list => {
      if (list.props.name === firstItem.props.name) {
        return null
      } else {
        return React.cloneElement(list, {
          selected:false,
          handleClick: null,
          key: list.props.name,
          styleName: classnames({
            [list.props.styleName]: true, 
            'hide':!this.state.pushdown
          })
        })
      }
    });
    console.log(otherItems);

    return (
      <ul className = "menu-list">
        { firstItem }
        { /*otherItems*/ }
      </ul>
    )
  }
  render() {
    return (
      <div styleName = "menu" >
        {this.renderList()}
      </div>
    )
  }
}

class PushdownItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func
  }

  static defaultProps = {
    selected: true, //父元素传递进来的selected可以把默认selected覆盖
    handleClick: null,
    url:"#"
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {name, url, selected, handleClick} = this.props;

    const realHandleClick = (handleClick && selected) ? handleClick : null; //只有同时满足handleClick不为null且selected为true，才绑定handleClick
    return (
      <li styleName = "menu-item" onClick={handleClick}>
        <a href={url}>
          {name}
        </a>
      </li>
    )
  }
}

export  {PushdownMenu, PushdownItem};
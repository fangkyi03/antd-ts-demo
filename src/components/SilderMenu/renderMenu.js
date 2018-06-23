import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const renderMenuItem = ({key, title, icon, link,isShow,...props}) =>{
	const show = isShow === undefined ? true:isShow
	if (!show) {
		return null
	}
	if (props.sub) {
		return renderSubMenu({key, title, icon, link,isShow,...props})
	}
	return (
		<Menu.Item
			key={key || link}
			{...props}
		>
			<Link to={link || key}>
				{icon && <Icon type={icon}/>}
				<span className="nav-text">{title}</span>
			</Link>
		</Menu.Item>
	);
};


const renderSubMenu = ({key, title, icon, link, sub, ...props}) =>
	<Menu.SubMenu
		key={key || link}
		// title={title}
		title={
			<span>
				{icon && <Icon type={icon}/>}
				<span>{title}</span>
			</span>
		}
		{...props}
	>
		{sub && sub.map(item => renderMenuItem(item))}
	</Menu.SubMenu>;

export default ({menus, ...props}) => (

	<Menu {...props}>
		{
			menus && menus.map(
				item => item.sub && item.sub.length ?
					renderSubMenu(item) : renderMenuItem(item)
			)
		}
		{/* {
      menus.map((item,ind) => (
        <Menu.SubMenu
          key={ind}
          title={
            <span>
              {item.icon && <Icon type={item.icon}/>}
              <span>{item.title}</span>
            </span>
          }>
          {
            item.sub&&item.sub.map((e, index) => (
              <Menu.Item
                key={`${ind}-${index}`}>
                <Link to={e.link}>
                  {e.icon && <Icon type={e.icon} />}
                  <span className="nav-text">{e.title}</span>
                </Link>
              </Menu.Item>
            ))
          }
          </Menu.SubMenu>
        )
      )
    } */}
	</Menu>
);


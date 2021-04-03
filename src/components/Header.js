import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";
import CartSummary from "./CartSummary";
import { pageContentsSet, activeNavItemSet } from "../actions";
import { getJSON } from "../api";
import {  Input} from "antd";
const { Search } = Input;
export default function Header({ title }) {
  const { dispatch } = useContext(StoreContext);
  const onClickHeader = () => {
    pageContentsSet(dispatch, "NORDIC NEST Shopping Cart", getJSON("/"));
    activeNavItemSet(dispatch, "/");
  };
  const onSearch = value => console.log(value);
  return (
    <header className="header">
      <div className="header-wrap">
        <div className="header-text" onClick={onClickHeader}>
          <Link to='/'>
            <img className="header-logo" src="data:image/jpeg;base64,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"/>
          </Link>
          <Link to='/' >
            <p className='header-left-navbar'>菜單</p>
          </Link>
          <Link to='/' >
            <p className='header-left-navbar'>飲料比較</p>
          </Link>
          <Link to='/' >
            <p className='header-left-navbar'>評論區</p>
          </Link>
          <Link to='/' className='header-right-navbar'>
              <Search placeholder="input search text" className='header-right-search' allowClear onSearch={onSearch} style={{ width: 200 }} />
          </Link>
          <Link to='/' className='header-right-navbar'>
              <img className='header-right-navbar-icon' src="https://www.flaticon.com/svg/vstatic/svg/130/130195.svg?token=exp=1617465687~hmac=0790c68aef411a31341ecc81b726ba25"/>
          </Link>
          <Link to='/' >
          <img className='header-right-navbar-icon' src="https://www.flaticon.com/svg/vstatic/svg/2948/2948035.svg?token=exp=1617466812~hmac=8ef0e63f4ab4879bc54e0d5154749b69"/>
          </Link>
        </div>
       
        
      </div>
      
      <hr className="hr-header-line" />
    </header>
  );
}

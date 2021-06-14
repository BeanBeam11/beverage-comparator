import { Select,Input,Button,Rate } from 'antd';
import {useState,useEffect, useContext} from "react";
import {menuContentSet,addComment,checkLogin} from "../actions/";
import Cookie from "js-cookie";
import {StoreContext} from "../store"
import { Link } from "react-router-dom";

export default function AddComment() {
  const {state:{commentList,  menus,userSignin: { userInfo}},dispatch}= useContext(StoreContext);
  const { Option } = Select;
  const { TextArea } = Input;
  const provinceData = ['可不可熟成紅茶', '五十嵐',"麻古茶坊","迷客夏","清心福全"];
  const [brand,setbrand]=useState("");
  const [item,setitem]=useState("");
  const [description,setdescription]=useState("");
  const [rate,setrate]=useState(2.5);
  const check=()=>{
    if((userInfo==null)){
        console.log("no login");
        return false;
     }
    else{
      console.log("login");
        return true;
     }
}
  const Setdescription = e=>{
    setdescription(e.target.value);
   
  }
  const Setitem = value=>{
    console.log(value);
    setitem(value);
    console.log(item);
  }
  const Setstart = value=>{
    console.log(value);
    setrate(value);
  }
  const handleProvinceChange = value => {
    console.log(value);
    setbrand(value);
    console.log(brand);
      switch (value){
        case "可不可熟成紅茶":
          console.log("kbk");
          menuContentSet(dispatch,"kebuke");
          break;
        case "五十嵐":
          console.log("50");
          menuContentSet(dispatch,"50lan");
          break;
        case "麻古茶坊":
          console.log("macu");
          menuContentSet(dispatch,"macu");
          break;
        case "迷客夏":
          console.log("milk");
          menuContentSet(dispatch,"milkshop");
          break;
        case "清心福全":
          console.log("ching");
          menuContentSet(dispatch,"chingshin");
          break;
        
      }
    };
  const Publish=()=> {
    const resource={useremail:userInfo.email,username:userInfo.displayName,brand:brand,item:item,content:description,rating:rate};
    addComment(dispatch,resource);
  }
  useEffect(()=>{
    Cookie.set("commentList", JSON.stringify(commentList));
  }, [commentList])

  return(
    <>
    {check()?(
      <div className="comment-add" id="comment-login">
        <div className="comment-area-right">
          <img className="comment-img-user" src="./img/user_note.png"/>
        </div>
        <div className="comment-area-left">
          <div className="comment-select">
            <Select className="comment-select-company" defaultValue="請選擇店家" onChange={handleProvinceChange}>
              {provinceData.map(province => (
                <Option key={province}>{province}</Option>
              ))}
            </Select>
            <Select className="comment-select-beverage" defaultValue="請選擇飲料" onChange={Setitem}>
              {menus.map(item => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
            <div className="comment-rating"><Rate allowHalf defaultValue={2.5} onChange={Setstart}/></div>
          </div>
          <div className="comment-input">
            <TextArea rows={4} placeholder="寫點評論..." className="comment-input" onChange={Setdescription}/>
            <Button onClick={Publish} className="comment-bt-publish">發布</Button>
          </div> 
          </div>
      </div> ):(
      <div className="comment-add" id="comment-not-login">    
            <div className="comment-login-box">
                <Link to='/login'>
                <Button ghost className="comment-login">馬上登入並發表評論</Button>
                </Link>
            </div>
      </div>)}
    </>
  );
}
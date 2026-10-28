import { configureStore, createSlice } from '@reduxjs/toolkit';
import { products as starterProducts } from './products';
const initial = (() => { try { return JSON.parse(localStorage.getItem('stylesync-cart') || '[]'); } catch { return []; } })();
const cart = createSlice({ name:'cart', initialState:{items:initial}, reducers:{
 addItem(s,a){const item=s.items.find(x=>x.id===a.payload.id);item?item.quantity++:s.items.push({...a.payload,quantity:1});localStorage.setItem('stylesync-cart',JSON.stringify(s.items));},
 updateQuantity(s,a){const item=s.items.find(x=>x.id===a.payload.id);if(item)item.quantity=Math.max(1,item.quantity+a.payload.delta);localStorage.setItem('stylesync-cart',JSON.stringify(s.items));},
 removeItem(s,a){s.items=s.items.filter(x=>x.id!==a.payload);localStorage.setItem('stylesync-cart',JSON.stringify(s.items));}
}});
export const {addItem,updateQuantity,removeItem}=cart.actions;
const savedAccount=(()=>{try{return JSON.parse(localStorage.getItem('stylesync-account')||'null')||{user:null,addresses:[]}}catch{return{user:null,addresses:[]}}})();
const account=createSlice({name:'account',initialState:savedAccount,reducers:{
 signIn(s,a){s.user=a.payload;localStorage.setItem('stylesync-account',JSON.stringify(s));},
 signOut(s){s.user=null;localStorage.setItem('stylesync-account',JSON.stringify(s));},
 saveProfile(s,a){s.user={...s.user,...a.payload};localStorage.setItem('stylesync-account',JSON.stringify(s));},
 addAddress(s,a){s.addresses.push({...a.payload,id:Date.now()});localStorage.setItem('stylesync-account',JSON.stringify(s));},
 removeAddress(s,a){s.addresses=s.addresses.filter(x=>x.id!==a.payload);localStorage.setItem('stylesync-account',JSON.stringify(s));}
}});
export const {signIn,signOut,saveProfile,addAddress,removeAddress}=account.actions;
const catalog=createSlice({name:'catalog',initialState:{items:starterProducts,status:'idle',error:null},reducers:{
 setCatalog(s,a){s.items=a.payload;s.status='ready';s.error=null;},
 setCatalogStatus(s,a){s.status=a.payload.status;s.error=a.payload.error||null;}
}});
export const {setCatalog,setCatalogStatus}=catalog.actions;
export const store=configureStore({reducer:{cart:cart.reducer,account:account.reducer,catalog:catalog.reducer}});

import React from 'react';

const hiddenFields=new Set(['location','latitude','longitude','timezone','admin','country','forecast_for','period','units','gender','id','url','code']);
const labelFor=key=>String(key).replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]+/g,' ').replace(/^\w/,letter=>letter.toUpperCase());

function collectAdvice(value,key='',items=[]){
  if(value==null||hiddenFields.has(String(key).toLowerCase()))return items;
  if(typeof value==='string'||typeof value==='number'){
    const text=String(value).trim();
    if(text&&key)items.push({label:labelFor(key),text});
    else if(text)items.push({label:'Style note',text});
    return items;
  }
  if(Array.isArray(value)){
    value.forEach((entry,index)=>collectAdvice(entry,typeof entry==='object'?key:(key||`Suggestion ${index+1}`),items));
    return items;
  }
  if(typeof value==='object')Object.entries(value).forEach(([childKey,child])=>collectAdvice(child,childKey,items));
  return items;
}

export default function AdviceSummary({data,city}){
  const direct=[data?.recommendation,data?.advice,data?.outfit,data?.summary,data?.message].find(value=>typeof value==='string'&&value.trim());
  const items=collectAdvice(data?.options);
  const locationName=typeof data?.location?.name==='string'?data.location.name:city;
  return <section className="api-advice" aria-live="polite">
    <span className="eyebrow">TODAY’S STYLE NOTES · {locationName}</span>
    {direct&&<p className="advice-summary-text">{direct}</p>}
    {items.length>0?<ul className="advice-note-list">{items.map((item,index)=><li key={`${item.label}-${index}`}><b>{item.label}</b><span>{item.text}</span></li>)}</ul>:!direct&&<p className="advice-summary-text">Forecast checked for {locationName}. Your outfit pairings from the collection are below.</p>}
  </section>;
}

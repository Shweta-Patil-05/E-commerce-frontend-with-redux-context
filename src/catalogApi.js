const CATEGORY_MAP={
  tops:'Tops','mens-shirts':'Tops','womens-dresses':'Dresses',
  'mens-shoes':'Footwear','womens-shoes':'Footwear','womens-bags':'Bags',
  'womens-jewellery':'Jewellery','mens-watches':'Watches','womens-watches':'Watches',
  sunglasses:'Accessories'
};

function productCategory(item){
  const title=item.title.toLowerCase();
  // The upstream catalog mixes fashion with household goods. Reject home and
  // kitchen products before keyword matching (for example, a pot with a lid).
  if(/\b(kitchen|cookware|pot|pots|pan|pans|appliance|appliances|lid|cooktop|blender|toaster|kettle|furniture|home decor)\b/.test(title))return null;
  // DummyJSON groups some distinct garments under broad categories such as "tops".
  // Use the actual product name first so a dress or trouser is never presented as a top.
  if(/\b(dress|frock|gown)\b/.test(title))return 'Dresses';
  if(/\b(trouser|jeans|pants|shorts|skirt|leggings)\b/.test(title))return 'Bottoms';
  if(/\b(shoe|shoes|sneaker|sneakers|trainer|trainers|heel|heels|boot|boots|slipper|cleat)\b/.test(title))return 'Footwear';
  if(/\b(bag|backpack|handbag|purse|tote)\b/.test(title))return 'Bags';
  if(/\b(earring|earrings|jewellery|jewelry|necklace|bracelet)\b/.test(title))return 'Jewellery';
  if(/\b(watch|watches)\b/.test(title))return 'Watches';
  if(/\b(sunglasses|eyeglasses|belt|scarf|hat)\b/.test(title))return 'Accessories';
  if(/\b(cap|caps)\b/.test(title)&&/\b(baseball|snapback|trucker|sports?)\b/.test(title))return 'Accessories';
  return CATEGORY_MAP[item.category]||null;
}

export async function fetchFashionProducts(signal){
  const response=await fetch('https://dummyjson.com/products?limit=0&select=id,title,description,category,price,discountPercentage,images,thumbnail,tags,rating',{signal});
  if(!response.ok)throw new Error(`Product service returned ${response.status}`);
  const payload=await response.json();
  return (payload.products||[]).filter(item=>productCategory(item)&&(item.images?.length||item.thumbnail)).map(item=>({
    id:`dummy-${item.id}`,
    name:item.title,
    category:productCategory(item),
    price:Math.max(299,Math.round(Number(item.price||10)*80)),
    oldPrice:Math.round(Number(item.price||10)*80*(1+(item.discountPercentage||15)/100)),
    color:'Assorted',style:'Everyday',occasion:'Everyday',
    image:item.images?.[0]||item.thumbnail,
    tag:'Style pick',rating:item.rating,
    description:item.description
  }));
}

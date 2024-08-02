const getRecentProducts = async () => {
  console.log('GETRECENT!!!!!!!!!!!!!!!!!!!!!!!!!');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/recent`, {
    next: { tags: ['recentProducts'] },
  });
  if (!res.ok) {
    console.log('GETRECENT!!!!!!!!!!!!!!!!!!!!!!!!! null');
    return null;
  }
  const data = await res.json();
  console.log('GETRECENT!!!!!!!!!!!!!!!!!!!!!!!!! succecsscsc');
  return data;
};

export default getRecentProducts;

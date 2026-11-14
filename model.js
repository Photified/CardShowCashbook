export const METHODS = ['cash', 'card', 'etransfer'];
export function cents(value) {
  const raw = String(value).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) throw new Error('Enter a valid amount with up to two decimal places.');
  const n = Math.round(Number(raw) * 100);
  if (!Number.isSafeInteger(n) || n > 100000000) throw new Error('Amount is too large.');
  return n;
}
export function totals(show) {
  let sales=0, purchases=0, cash=show.startingCash;
  if (show.feeMethod === 'cash') cash -= show.tableFee;
  for(const tx of show.transactions) {
    const sign=tx.type==='sale'?1:-1;
    if(tx.type==='sale') sales+=tx.amount; else purchases+=tx.amount;
    if(tx.method==='cash') cash+=sign*tx.amount;
  }
  return {sales,purchases,cash,net:sales-purchases-show.tableFee,count:show.transactions.length};
}
export function validBackup(data) {
  const money=n=>Number.isSafeInteger(n)&&n>=0&&n<=100000000;
  if(!data || data.version!==1 || !Array.isArray(data.shows) || data.shows.length>5000) return false;
  const ids=new Set();
  return data.shows.every(s=>{
    if(!s || typeof s.id!=='string' || ids.has(s.id)) return false; ids.add(s.id);
    if(typeof s.name!=='string'||!s.name.trim()||s.name.length>80||typeof s.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.date)||!money(s.startingCash)||!money(s.tableFee)||!METHODS.includes(s.feeMethod)||typeof s.ended!=='boolean'||!Array.isArray(s.transactions)||s.transactions.length>100000) return false;
    const txids=new Set();
    return s.transactions.every(t=>{
      if(!t||typeof t.id!=='string'||txids.has(t.id))return false; txids.add(t.id);
      return ['sale','purchase'].includes(t.type)&&money(t.amount)&&t.amount>0&&METHODS.includes(t.method)&&typeof t.note==='string'&&t.note.length<=160&&typeof t.time==='string'&&!Number.isNaN(Date.parse(t.time));
    });
  });
}

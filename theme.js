(() => {
 const root=document.documentElement,select=document.getElementById('theme');
 function apply(value){
  const theme=value==='light'?'light':'dark';
  root.dataset.theme=theme;select.value=theme;
  document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='light'?'#f4fafc':'#101319');
  try{localStorage.setItem('fuenfzehn-theme',theme)}catch{}
 }
 let initial=root.dataset.theme||'dark';
 try{const saved=localStorage.getItem('fuenfzehn-theme');if(saved==='light'||saved==='dark')initial=saved}catch{}
 apply(initial);select.addEventListener('change',()=>apply(select.value));
})();

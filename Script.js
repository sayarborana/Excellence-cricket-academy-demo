
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.nav-links');
 if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
 document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
 const lb=document.querySelector('.lightbox');
 document.querySelectorAll('[data-lightbox]').forEach(item=>{
   item.addEventListener('click',()=>{
     const img=item.querySelector('img'); if(!img||!lb)return;
     lb.querySelector('img').src=img.src; lb.querySelector('.lb-caption').textContent=item.dataset.title||img.alt||'Academy Photo';
     lb.classList.add('open'); document.body.style.overflow='hidden';
   });
 });
 if(lb){
   const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};
   lb.querySelector('.close').addEventListener('click',close);
   lb.addEventListener('click',e=>{if(e.target===lb)close()});
   document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 const form=document.querySelector('#inquiryForm');
 if(form) form.addEventListener('submit',e=>{e.preventDefault(); alert('Thank you! Your inquiry has been received. We will contact you soon.'); form.reset();});
});

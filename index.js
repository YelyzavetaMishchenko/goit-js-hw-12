import{a as m,S as h}from"./assets/vendor-ICl9yzX2.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const y="48548888-6a688bae8a9a8d1a3f9b35105",g="https://pixabay.com/api/";async function b(t,a=1,s=15){try{return(await m.get(g,{params:{key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:a}})).data}catch(o){throw console.error("Error fetching images:",o),o}}function L(t){return t.map(({webformatURL:a,largeImageURL:s,tags:o,likes:e,views:r,comments:n,downloads:p})=>`
          <div class="photo-card">
            <a href="${s}" class="gallery-link">
              <img src="${a}" alt="${o}" loading="lazy" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${e}</p>
              <p><b>Views:</b> ${r}</p>
              <p><b>Comments:</b> ${n}</p>
              <p><b>Downloads:</b> ${p}</p>
            </div>
          </div>`).join("")}const v=document.querySelector("#search-form"),u=document.querySelector(".gallery"),i=document.querySelector(".load-more");let l="",c=1;const d=15;let w=new h(".gallery a");v.addEventListener("submit",async t=>{t.preventDefault(),l=t.target.searchQuery.value.trim(),l&&(c=1,u.innerHTML="",i.classList.add("hidden"),await f())});i.addEventListener("click",async()=>{c+=1,await f()});async function f(){try{const t=await b(l,c,d);if(t.hits.length===0){alert("No images found. Try a different search query.");return}u.insertAdjacentHTML("beforeend",L(t.hits)),w.refresh(),c*d>=t.totalHits?(i.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results.")):i.classList.remove("hidden")}catch{alert("Something went wrong. Please try again later.")}}
//# sourceMappingURL=index.js.map

import{a as S,S as b,i as f}from"./assets/vendor-BjRz3xa9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const w="49662945-8e09ebd816e6f5a1c3c1cc874";function m(s,e=1){const a=new URLSearchParams({key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return S(`https://pixabay.com/api/?${a}`)}const v=document.querySelector(".gallery"),d=document.querySelector(".loader-js");document.querySelector(".load-more-btn");function p(s,e=!1){const a=document.querySelector(".gallery");e||(a.innerHTML=""),a.innerHTML+=s.map(({webformatURL:c,largeImageURL:t,tags:r,likes:i,views:g,comments:h,downloads:L})=>`
        <li class="gallery-item">
          <a class="item-link" href="${t}">
            <img class="img" src="${c}" alt="${r}" />
            <ul class="statistic-list">
              <li class="statistic-item">
                <p class="statistic-text">Likes</p>
                <p class="statistic-value">${i}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Views</p>
                <p class="statistic-value">${g}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Comments</p>
                <p class="statistic-value">${h}</p>
              </li>
              <li class="statistic-item">
                <p class="statistic-text">Downloads</p>
                <p class="statistic-value">${L}</p>
              </li>
            </ul>
          </a>
        </li>
      `).join(""),new b(".gallery li a",{captionsData:"alt",captionDelay:250}).refresh()}function q(){v.innerHTML=""}function y(){d.classList.add("loader")}function u(){d.classList.remove("loader")}const x=document.querySelector(".form"),l=document.querySelector(".load-more-btn");document.querySelector(".loader-js");let o=1,n="";x.addEventListener("submit",$);l.addEventListener("click",I);async function $(s){if(s.preventDefault(),n=s.target.elements.text.value.trim(),!!n){o=1,y();try{const e=await m(n,o),a=e.data.hits;if(a.length===0){f.warning({message:"На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит!",messageColor:"#ffffff"}),l.style.display="none",q(),u();return}p(a),e.data.totalHits>o*15&&(l.style.display="block"),u()}catch(e){console.error(e.message)}}}async function I(){o+=1,y();try{const s=await m(n,o),e=s.data.hits;if(e.length===0){l.style.display="none",f.info({message:"На жаль, ви досягли кінця результатів пошуку.",messageColor:"#ffffff"}),u();return}p(e,!0),s.data.totalHits<=o*15&&(l.style.display="none",f.info({message:"На жаль, ви досягли кінця результатів пошуку.",messageColor:"#ffffff"})),u(),P()}catch(s){console.error(s.message)}}function P(){const s=document.querySelectorAll(".gallery-item"),e=s[s.length-1];if(e){const{top:a}=e.getBoundingClientRect();window.scrollBy({top:a-100,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map

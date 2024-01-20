import{S as g,a as y,i as v}from"./assets/vendor-89feecc5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const b=document.querySelector(".search"),c=document.querySelector(".gallery"),S=document.querySelector(".textInput"),u=document.querySelector(".loader"),l=document.querySelector(".moreBtn"),m=new g(".gallery a",{captionsData:"alt",captionDelay:250}),L=40;let o=1,f="";b.addEventListener("submit",w);l.addEventListener("click",q);function w(t){t.preventDefault(),f=t.target.elements.search.value,c.innerHTML="",S.value="",u.style.visibility="visible",o=1,$(h(f,o))}function q(t){l.style.visibility="hidden",u.style.visibility="visible",o+=1,B(h(f,o))}function h(t,e){const a="https://pixabay.com/api",s=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:"true",key:"29710136-0ffe1ca247b000977a61f6ae2",per_page:L,page:e});return`${a}/?q=${t}&${s.toString()}`}async function $(t){try{o=1;const e=await y.get(t);if(u.style.visibility="hidden",e.status!==200&&n(e.status),e.data.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!");return}const a=e.data.hits.reduce((s,i)=>s+p(i),"");c.insertAdjacentHTML("beforeend",a),m.refresh(),e.data.totalHits>o*40?l.style.visibility="visible":(l.style.visibility="hidden",n("We're sorry, but you've reached the end of search results."))}catch(e){n(e.toString())}}async function B(t){try{const e=await y.get(t);if(u.style.visibility="hidden",e.status!==200&&n(e.status),e.data.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!");return}const a=e.data.hits.reduce((s,i)=>s+p(i),"");c.insertAdjacentHTML("beforeend",a),m.refresh(),e.data.totalHits>o*40?(l.style.visibility="visible",O()):(l.style.visibility="hidden",n("We're sorry, but you've reached the end of search results."))}catch(e){n(e.toString())}}function O(){window.scrollBy({top:c.getBoundingClientRect().height*.04,behavior:"smooth"})}function n(t){v.error({message:t,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",transitionIn:"flipInX",transitionOut:"flipOutX"})}function p(t){return`<li>
        <a href="${t.largeImageURL}">
          <img src="${t.webformatURL}" alt="${t.tags}">
        </a>
        <div class="info">
          <div class="image-info">
            <span>Likes</span>
            <span class="image-value">${t.likes}</span>
          </div>
          <div class="image-info">
            <span>Views</span>
            <span class="image-value">${t.views}</span>
          </div>
          <div class="image-info">
            <span>Comments</span>
            <span class="image-value">${t.comments}</span>
          </div>
          <div class="image-info">
            <span>Downloads</span>
            <span class="image-value">${t.downloads}</span>
          </div>
        </div>
      </li>
    `}
//# sourceMappingURL=commonHelpers.js.map

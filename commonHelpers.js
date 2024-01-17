import{S as c,i as u}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const d=document.querySelector(".search"),i=document.querySelector(".gallery"),f=document.querySelector(".textInput"),m=new c(".gallery a",{captionsData:"alt",captionDelay:250}),l=document.querySelector(".loader");d.addEventListener("submit",p);function p(r){r.preventDefault();const t=r.target.elements.search.value;i.innerHTML="",f.value="",l.style.display="block",h(g(t))}function g(r){const t="https://pixabay.com/api",o=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:"true",key:"29710136-0ffe1ca247b000977a61f6ae2"});return`${t}/?q=${r}&${o.toString()}`}function h(r){fetch(r).then(t=>{if(l.style.display="none",!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}const o=t.hits.reduce((a,e)=>a+y(e),"");i.innerHTML=o,m.refresh()}).catch(t=>{alert(t.toString())})}function y(r){return`<li>
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}">
        </a>
        <div class="info">
          <div class="image-info">
            <span>Likes</span>
            <span class="image-value">${r.likes}</span>
          </div>
          <div class="image-info">
            <span>Views</span>
            <span class="image-value">${r.views}</span>
          </div>
          <div class="image-info">
            <span>Comments</span>
            <span class="image-value">${r.comments}</span>
          </div>
          <div class="image-info">
            <span>Downloads</span>
            <span class="image-value">${r.downloads}</span>
          </div>
        </div>
      </li>
    `}
//# sourceMappingURL=commonHelpers.js.map

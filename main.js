(()=>{"use strict";function t(t,e,n,r,o,c,u,i,a,l){var s=t.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__image"),f=s.querySelector(".card__delete-button"),p=s.querySelector(".card__like-button"),_=s.querySelector(".card__like-counter"),m=!1;return d.src=e,d.alt=n,_.textContent=r.length,s.querySelector(".card__title").textContent=n,o===c&&(f.classList.add("card__delete-button_active"),f.addEventListener("click",(function(){return a(u,s)}))),r.some((function(t){return t._id===o}))&&(p.classList.add("card__like-button_is-active"),m=!0),p.addEventListener("click",(function(t){return l(t,u,m,_)})),d.addEventListener("click",i),s}function e(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(t){document.removeEventListener("keydown",o),t.classList.remove("popup_is-opened")}function r(t,e){t.target.classList.contains("popup")&&n(e)}function o(t){"Escape"===t.key&&n(document.querySelector(".popup_is-opened"))}function c(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n),o.classList.remove(r),o.textContent=""}function u(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n)):(e.disabled=!0,e.classList.add(n))}function i(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector));u(n,t.querySelector(e.submitButtonSelector),e.inactiveButtonClass),n.forEach((function(n){c(t,n,e.inputErrorClass,e.errorClass)}))}function a(t,e){return fetch("".concat(t.baseUrl).concat(t.cohort).concat(e),{headers:{authorization:t.token}})}function l(t,e,n){return fetch("".concat(t.baseUrl).concat(t.cohort).concat(e),{method:"PATCH",headers:{authorization:t.token,"Content-Type":"application/json"},body:JSON.stringify(n)})}function s(t,e,n){return fetch("".concat(t.baseUrl).concat(t.cohort).concat(e).concat(n),{method:"DELETE",headers:{authorization:t.token}})}function d(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var p,_=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),b=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_del-card"),L=document.querySelector(".popup_type_edit-avatar"),E=L.querySelector(".popup__close"),q=document.querySelector(".profile__image"),g=k.querySelector(".popup__close"),C=document.forms.edit_avatar,x=document.forms.del_card,A=document.forms.edit_profile,T=b.querySelector(".popup__close"),w=document.forms.new_place,j=h.querySelector(".popup__close"),U=S.querySelector(".popup__close"),O=document.querySelector(".profile__title"),B=document.querySelector(".profile__image"),z=document.querySelector(".profile__description"),D=S.querySelector(".popup__image"),I=S.querySelector(".popup__caption"),P=A.elements.profile_name,M=A.elements.description,N=w.elements.place_name,J=w.elements.link,V=C.elements.link,H=b.querySelector(".popup__button"),$=h.querySelector(".popup__button"),F=L.querySelector(".popup__button"),G=k.querySelector(".popup__button"),K={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Q={token:"4beae149-dbca-4748-9357-2aff8b55b5f4",cohort:"wff-cohort-8",baseUrl:"https://nomoreparties.co/v1/"},R=[],W="",X="",Y="";function Z(t){var n,r,o;e(S),n=D,r=I,o=t.currentTarget,n.src=o.src,n.alt=o.alt,r.textContent=o.alt}function tt(t,n){X=t,Y=n,e(k)}function et(t){O.textContent=t.name,z.textContent=t.about,B.style.backgroundImage="url(".concat(t.avatar,")"),W=t._id}function nt(t,e,n,r,o){(function(t,e,n){return function(t,e,n){return fetch("".concat(t.baseUrl).concat(t.cohort).concat(e).concat(n),{method:"PUT",headers:{authorization:t.token}})}(t,e,n).then(d)})(t,e,n).then((function(t){r.classList.add("card__like-button_is-active"),o.textContent=t.likes.length,R[n]=!0})).catch((function(t){return console.log(t)}))}function rt(t,e,n,r,o){(function(t,e,n){return s(t,e,n).then(d)})(t,e,n).then((function(t){r.classList.remove("card__like-button_is-active"),o.textContent=t.likes.length,R[n]=!1})).catch((function(t){return console.log(t)}))}function ot(t,e,n,r){var o=t.currentTarget;e in R?R[e]?rt(Q,"/cards/likes/",e,o,r):nt(Q,"/cards/likes/",e,o,r):n?rt(Q,"/cards/likes/",e,o,r):nt(Q,"/cards/likes/",e,o,r)}function ct(t,e){t.textContent=e?"Удаление...":"Да"}function ut(t,e){t.textContent=e?"Сохранение...":"Сохранить"}T.addEventListener("click",(function(){return n(b)})),j.addEventListener("click",(function(){return n(h)})),U.addEventListener("click",(function(){return n(S)})),g.addEventListener("click",(function(){return n(k)})),E.addEventListener("click",(function(){return n(L)})),b.addEventListener("click",(function(t){return r(t,b)})),h.addEventListener("click",(function(t){return r(t,h)})),S.addEventListener("click",(function(t){return r(t,S)})),k.addEventListener("click",(function(t){return r(t,k)})),L.addEventListener("click",(function(t){return r(t,L)})),A.addEventListener("submit",(function(t){t.preventDefault();var e=t.currentTarget;ut(H,!0);var r={};r.name=P.value,r.about=M.value,function(t,e,n){return l(t,"/users/me",n).then(d)}(Q,0,r).then((function(t){et(t),i(A,K),n(b),e.reset()})).catch((function(t){return console.log(t)})).finally((function(){return ut(H,!1)}))})),w.addEventListener("submit",(function(e){e.preventDefault();var r=e.currentTarget;ut($,!0);var o={};o.name=N.value,o.link=J.value,function(t,e,n){return function(t,e,n){return fetch("".concat(t.baseUrl).concat(t.cohort).concat(e),{method:"POST",headers:{authorization:t.token,"Content-Type":"application/json"},body:JSON.stringify(n)})}(t,e,n).then(d)}(Q,"/cards",o).then((function(e){!function(e){m.prepend(t(_,e.link,e.name,e.likes,W,e.owner._id,e._id,Z,tt,ot))}(e),i(w,K),n(h),r.reset()})).catch((function(t){return console.log(t)})).finally((function(){return ut($,!1)}))})),x.addEventListener("submit",(function(t){return function(t){var e,r;t.preventDefault(),t.currentTarget,ct(G,!0),(e=Q,"/cards/",r=X,s(e,"/cards/",r).then(d)).then((function(){n(k),Y.remove()})).catch((function(t){return console.log(t)})).finally((function(){return ct(G,!1)}))}(t)})),C.addEventListener("submit",(function(t){t.preventDefault();var e=t.currentTarget;ut(F,!0);var r={};r.avatar=V.value,function(t,e,n){return l(t,"/users/me/avatar",n).then(d)}(Q,0,r).then((function(t){B.style.backgroundImage="url(".concat(t.avatar,")"),i(C,K),n(L),e.reset()})).catch((function(t){return console.log(t)})).finally((function(){return ut(F,!1)}))})),v.addEventListener("click",(function(){return e(b)})),v.addEventListener("click",(function(){b.classList.contains("popup_is-opened")&&function(t,e,n,r){t.value=n.textContent,e.value=r.textContent}(P,M,O,z)})),v.addEventListener("click",(function(){return i(A,K)})),y.addEventListener("click",(function(){return e(h)})),y.addEventListener("click",(function(){return i(w,K)})),q.addEventListener("click",(function(){return e(L)})),q.addEventListener("click",(function(){return i(C,K)})),Promise.all([(p=Q,"/users/me",a(p,"/users/me").then(d)),function(t,e){return a(t,e).then(d)}(Q,"/cards")]).then((function(e){var n,r,o=(r=2,function(t){if(Array.isArray(t))return t}(n=e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==e);a=!0);}catch(t){l=!0,o=t}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(n,r)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];et(c),u.forEach((function(e){m.append(t(_,e.link,e.name,e.likes,W,e.owner._id,e._id,Z,tt,ot))}))})).catch((function(t){return console.log(t)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e,n,r,o,i){var a=Array.from(t.querySelectorAll(e)),l=t.querySelector(n);u(a,l,r),a.forEach((function(e){e.addEventListener("input",(function(){!function(t,e,n,r){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?c(t,e,n,r):function(t,e,n,r,o){var c=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n),c.textContent=o,c.classList.add(r)}(t,e,n,r,e.validationMessage)}(t,e,o,i),u(a,l,r)}))}))}(e,t.inputSelector,t.submitButtonSelector,t.inactiveButtonClass,t.inputErrorClass,t.errorClass)}))}(K)})();
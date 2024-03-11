(()=>{"use strict";var e=[];function t(t,o,c){var u=t.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),a=u.querySelector(".card__delete-button"),l=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-counter");return i.src=o.link,i.alt=o.name,r(s,o.likes),u.querySelector(".card__title").textContent=o.name,o.userId===o.owner._id&&(a.classList.add("card__delete-button_active"),a.addEventListener("click",(function(){return c.openDeleteConfirmModal(o._id,u)}))),o.likes.some((function(e){return e._id===o.userId}))&&n(l,o._id),l.addEventListener("click",(function(t){return function(t,n,r,o,c){var u=t.currentTarget;e[n]?c(n,u,r):o(n,u,r)}(t,o._id,s,c.handleAddLike,c.handleDelLike)})),i.addEventListener("click",c.openImageModal),u}function n(t,n){t.classList.add("card__like-button_is-active"),e[n]=!0}function r(e,t){e.textContent=t.length}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function c(e){document.removeEventListener("keydown",i),e.classList.remove("popup_is-opened")}function u(e,t){e.target.classList.contains("popup")&&c(t)}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function a(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));l(n,e.querySelector(t.submitButtonSelector),t.inactiveButtonClass),n.forEach((function(n){a(e,n,t.inputErrorClass,t.errorClass)}))}var d={token:"4beae149-dbca-4748-9357-2aff8b55b5f4",cohort:"wff-cohort-8",baseUrl:"https://nomoreparties.co/v1/"};function f(e){return fetch("".concat(d.baseUrl).concat(d.cohort).concat(e),{headers:{authorization:d.token}})}function p(e,t){return fetch("".concat(d.baseUrl).concat(d.cohort).concat(e),{method:"PATCH",headers:{authorization:d.token,"Content-Type":"application/json"},body:JSON.stringify(t)})}function _(e,t){return fetch("".concat(d.baseUrl).concat(d.cohort).concat(e).concat(t),{method:"DELETE",headers:{authorization:d.token}})}function m(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y=document.querySelector("#card-template").content,h=document.querySelector(".places__list"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),E=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_del-card"),g=document.querySelector(".popup_type_edit-avatar"),C=g.querySelector(".popup__close"),A=document.querySelector(".profile__image"),T=q.querySelector(".popup__close"),x=document.forms.edit_avatar,I=document.forms.del_card,w=document.forms.edit_profile,j=E.querySelector(".popup__close"),D=document.forms.new_place,M=k.querySelector(".popup__close"),U=L.querySelector(".popup__close"),O=document.querySelector(".profile__title"),B=document.querySelector(".profile__image"),z=document.querySelector(".profile__description"),P=L.querySelector(".popup__image"),N=L.querySelector(".popup__caption"),J=w.elements.profile_name,V=w.elements.description,H=D.elements.place_name,$=D.elements.link,F=x.elements.link,G=E.querySelector(".popup__button"),K=k.querySelector(".popup__button"),Q=g.querySelector(".popup__button"),R=q.querySelector(".popup__button"),W={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},X={openImageModal:function(e){var t;o(L),t=e.currentTarget,P.src=t.src,P.alt=t.alt,N.textContent=t.alt},openDeleteConfirmModal:function(e,t){Z=e,ee=t,o(q)},handleAddLike:function(e,t,o){(function(e,t){return function(e,t){return fetch("".concat(d.baseUrl).concat(d.cohort).concat(e).concat(t),{method:"PUT",headers:{authorization:d.token}})}(e,t).then(m)})("/cards/likes/",e).then((function(c){n(t,e),r(o,c.likes)})).catch((function(e){return console.log(e)}))},handleDelLike:function(t,n,o){var c;("/cards/likes/",c=t,_("/cards/likes/",c).then(m)).then((function(c){!function(t,n){t.classList.remove("card__like-button_is-active"),e[n]=!1}(n,t),r(o,c.likes)})).catch((function(e){return console.log(e)}))}},Y="",Z="",ee="";function te(e){O.textContent=e.name,z.textContent=e.about,B.style.backgroundImage="url(".concat(e.avatar,")"),Y=e._id}function ne(e,t,n,r){e.textContent=t?n:r}j.addEventListener("click",(function(){return c(E)})),M.addEventListener("click",(function(){return c(k)})),U.addEventListener("click",(function(){return c(L)})),T.addEventListener("click",(function(){return c(q)})),C.addEventListener("click",(function(){return c(g)})),E.addEventListener("click",(function(e){return u(e,E)})),k.addEventListener("click",(function(e){return u(e,k)})),L.addEventListener("click",(function(e){return u(e,L)})),q.addEventListener("click",(function(e){return u(e,q)})),g.addEventListener("click",(function(e){return u(e,g)})),w.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget;ne(G,!0,"Сохранение...","Сохранить");var n={};n.name=J.value,n.about=V.value,function(e,t){return p("/users/me",t).then(m)}(0,n).then((function(e){te(e),s(w,W),c(E),t.reset()})).catch((function(e){return console.log(e)})).finally((function(){return ne(G,!1,"Сохранение...","Сохранить")}))})),D.addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget;ne(K,!0,"Сохранение...","Сохранить");var r={};r.name=H.value,r.link=$.value,function(e,t){return function(e,t){return fetch("".concat(d.baseUrl).concat(d.cohort).concat(e),{method:"POST",headers:{authorization:d.token,"Content-Type":"application/json"},body:JSON.stringify(t)})}(e,t).then(m)}("/cards",r).then((function(e){!function(e){e.userId=Y,h.prepend(t(y,e,X))}(e),s(D,W),c(k),n.reset()})).catch((function(e){return console.log(e)})).finally((function(){return ne(K,!1,"Сохранение...","Сохранить")}))})),I.addEventListener("submit",(function(e){return function(e){var t;e.preventDefault(),e.currentTarget,ne(R,!0,"Удаление...","Да"),("/cards/",t=Z,_("/cards/",t).then(m)).then((function(){c(q),ee.remove()})).catch((function(e){return console.log(e)})).finally((function(){return ne(R,!1,"Удаление...","Да")}))}(e)})),x.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget;ne(Q,!0,"Сохранение...","Сохранить");var n={};n.avatar=F.value,function(e,t){return p("/users/me/avatar",t).then(m)}(0,n).then((function(e){B.style.backgroundImage="url(".concat(e.avatar,")"),s(x,W),c(g),t.reset()})).catch((function(e){return console.log(e)})).finally((function(){return ne(Q,!1,"Сохранение...","Сохранить")}))})),S.addEventListener("click",(function(){return o(E)})),S.addEventListener("click",(function(){E.classList.contains("popup_is-opened")&&(J.value=O.textContent,V.value=z.textContent)})),S.addEventListener("click",(function(){return s(w,W)})),b.addEventListener("click",(function(){return o(k)})),b.addEventListener("click",(function(){return s(D,W)})),A.addEventListener("click",(function(){return o(g)})),A.addEventListener("click",(function(){return s(x,W)})),Promise.all([("/users/me",f("/users/me").then(m)),function(e){return f(e).then(m)}("/cards")]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];te(c),u.forEach((function(e){e.userId=Y,h.append(t(y,e,X))}))})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t,n,r,o,c){var u=Array.from(e.querySelectorAll(t)),i=e.querySelector(n);l(u,i,r),u.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=o,c.classList.add(r)}(e,t,n,r,t.validationMessage)}(e,t,o,c),l(u,i,r)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(W)})();
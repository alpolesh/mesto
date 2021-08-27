!function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o=e.name,i=e.link;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._imageName=o,this._imageLink=i,this._templateSelector=n,this._handleCardClick=r,this._elementTemplate=document.querySelector(this._templateSelector).content,this._cardElement=this._elementTemplate.querySelector(".elements__element"),this._element=this._cardElement.cloneNode(!0),this._elementImage=this._element.querySelector(".elements__image"),this._elementName=this._element.querySelector(".elements__name"),this._elementHeart=this._element.querySelector(".elements__heart"),this._elementTrash=this._element.querySelector(".elements__trash")}var n,r;return n=t,(r=[{key:"_handleClickHeart",value:function(e){e.target.classList.toggle("elements__heart_active")}},{key:"_handleRemoveCard",value:function(e){e.target.closest(".elements__element").remove()}},{key:"_setEventListeners",value:function(){var e=this;this._elementHeart.addEventListener("click",this._handleClickHeart),this._elementTrash.addEventListener("click",this._handleRemoveCard),this._elementImage.addEventListener("click",(function(){e._handleCardClick(e._imageLink,e._imageName)}))}},{key:"generateCard",value:function(){return this._elementImage.src=this._imageLink,this._elementImage.alt=this._imageName,this._elementName.textContent=this._imageName,this._setEventListeners(),this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputError=t.inputError,this._formElement=n}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e,t,n){var r=this._inputErrorClass,o=this._errorClass,i=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),i.textContent=n,i.classList.add(o)}},{key:"_hideInputError",value:function(e,t){var n=this._inputErrorClass,r=this._errorClass,o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}},{key:"_checkInputValidity",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){var n=this._inactiveButtonClass;this._hasInvalidInput(e)?t.classList.add(n):t.classList.remove(n)}},{key:"_setEventListeners",value:function(){var e=this,t=this._inputSelector,n=this._submitButtonSelector,r=this._formElement,o=Array.from(r.querySelectorAll(t)),i=r.querySelector(n);this._toggleButtonState(o,i),o.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(r,t),e._toggleButtonState(o,i)}))}))}},{key:"cleanForm",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputError)),n=Array.from(this._formElement.querySelectorAll(this._inputSelector));this._formElement.reset(),t.forEach((function(t){t.textContent="",t.classList.remove(e._errorClass)})),n.forEach((function(t){t.classList.remove(e._inputErrorClass)}))}},{key:"enableSubmitButton",value:function(){this._formElement.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass)}},{key:"disableSubmitButton",value:function(){this._formElement.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass)}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains("popup_opened")&&this.close()}},{key:"_handleButtonClose",value:function(){this.close()}},{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._handleOverlayClose.bind(this)),this._popup.querySelector(".popup__close").addEventListener("click",this._handleButtonClose.bind(this))}}])&&o(t.prototype,n),e}();function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=p(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=p(r);if(o){var n=p(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return c(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._fullImage=t._popup.querySelector(".image-viewer__image"),t._fullImageDescription=t._popup.querySelector(".image-viewer__description"),t}return t=a,(n=[{key:"_insertFullImage",value:function(e,t){this._fullImage.src=e,this._fullImage.alt=t,this._fullImageDescription.textContent=t}},{key:"open",value:function(e,t){s(p(a.prototype),"open",this).call(this),this._insertFullImage(e,t)}}])&&l(t.prototype,n),a}(i);function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return v(e)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._handleFormSubmit=t.bind(v(r)),r._cleanForm=n,r._inputList=Array.from(r._popup.querySelectorAll("input")),r._formValues={},r._formElement=r._popup.querySelector(".popup__form"),r}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;this._inputList.forEach((function(t){e._formValues[t.name]=t.value}))}},{key:"close",value:function(){h(b(a.prototype),"close",this).call(this),this._cleanForm()}},{key:"setEventListeners",value:function(){var e=this;h(b(a.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){e._getInputValues.bind(e)(),e._handleFormSubmit(t,e._formValues)}))}}])&&m(t.prototype,n),a}(i);function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var S=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"clearContainer",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this;this.clearContainer(),this._renderedItems.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&E(t.prototype,n),e}();function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C=function(){function e(t){var n=t.nameSelector,r=t.descriptionSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileNameElement=document.querySelector(n),this._profileDescriptionElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileNameElement.textContent,description:this._profileDescriptionElement.textContent}}},{key:"setUserInfo",value:function(e,t){this._profileNameElement.textContent=e,this._profileDescriptionElement.textContent=t}}])&&k(t.prototype,n),e}(),w=".popup-edit",L=document.querySelector(w),O=L.querySelector(".popup__input_type_name"),I=L.querySelector(".popup__input_type_description"),q=L.querySelector(".popup__form"),j=".popup-add-card",B=document.querySelector(j),P=B.querySelector(".popup__form"),R=(B.querySelector(".popup__input_type_name"),B.querySelector(".popup__input_type_description"),document.querySelector(".profile")),x=R.querySelector(".profile__edit-button-container"),T=R.querySelector(".profile__add-button-container"),D={inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active",inputError:".popup__input-error"},N=new f(".image-viewer");N.setEventListeners();var V=new C({nameSelector:".profile__name",descriptionSelector:".profile__description"});function F(e){return new t(e,"#element-template",(function(e,t){return N.open(e,t)})).generateCard()}var A=new S({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=F(e);A.addItem(t)}},".elements__list");A.renderItems();var H=new r(D,q);H.enableValidation();var U=new r(D,P);U.enableValidation();var M=new g(w,(function(e,t){e.preventDefault(),V.setUserInfo(t["popup-name"],t["popup-description"]),M.close()}),(function(){H.cleanForm()}));M.setEventListeners(),x.addEventListener("click",(function(){M.open(),H.enableSubmitButton(),O.value=V.getUserInfo().name,I.value=V.getUserInfo().description}));var z=new g(j,(function(e,t){e.preventDefault();var n=F({name:t["popup-name"],link:t["popup-description"]});A.addItem(n),z.close()}),(function(){U.cleanForm()}));z.setEventListeners(),T.addEventListener("click",(function(){z.open(),U.disableSubmitButton()}))}();
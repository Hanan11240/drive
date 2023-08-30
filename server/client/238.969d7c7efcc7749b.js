"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[238],{5243:(Y,B,u)=>{u.d(B,{b:()=>F});var h=u(727);class _ extends h.w0{constructor(p,g){super()}schedule(p,g=0){return this}}const y={setInterval(x,p,...g){const{delegate:b}=y;return b?.setInterval?b.setInterval(x,p,...g):setInterval(x,p,...g)},clearInterval(x){const{delegate:p}=y;return(p?.clearInterval||clearInterval)(x)},delegate:void 0};var L=u(8737);const C={now:()=>(C.delegate||Date).now(),delegate:void 0};class O{constructor(p,g=O.now){this.schedulerActionCtor=p,this.now=g}schedule(p,g=0,b){return new this.schedulerActionCtor(this,p).schedule(b,g)}}O.now=C.now;const v=new class U extends O{constructor(p,g=O.now){super(p,g),this.actions=[],this._active=!1}flush(p){const{actions:g}=this;if(this._active)return void g.push(p);let b;this._active=!0;do{if(b=p.execute(p.state,p.delay))break}while(p=g.shift());if(this._active=!1,b){for(;p=g.shift();)p.unsubscribe();throw b}}}(class S extends _{constructor(p,g){super(p,g),this.scheduler=p,this.work=g,this.pending=!1}schedule(p,g=0){var b;if(this.closed)return this;this.state=p;const w=this.id,N=this.scheduler;return null!=w&&(this.id=this.recycleAsyncId(N,w,g)),this.pending=!0,this.delay=g,this.id=null!==(b=this.id)&&void 0!==b?b:this.requestAsyncId(N,this.id,g),this}requestAsyncId(p,g,b=0){return y.setInterval(p.flush.bind(p,this),b)}recycleAsyncId(p,g,b=0){if(null!=b&&this.delay===b&&!1===this.pending)return g;null!=g&&y.clearInterval(g)}execute(p,g){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const b=this._execute(p,g);if(b)return b;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(p,g){let w,b=!1;try{this.work(p)}catch(N){b=!0,w=N||new Error("Scheduled action threw falsy error")}if(b)return this.unsubscribe(),w}unsubscribe(){if(!this.closed){const{id:p,scheduler:g}=this,{actions:b}=g;this.work=this.state=this.scheduler=null,this.pending=!1,(0,L.P)(b,this),null!=p&&(this.id=this.recycleAsyncId(g,p,null)),this.delay=null,super.unsubscribe()}}});var k=u(4482),T=u(5403);function F(x,p=v){return(0,k.e)((g,b)=>{let w=null,N=null,G=null;const V=()=>{if(w){w.unsubscribe(),w=null;const E=N;N=null,b.next(E)}};function m(){const E=G+x,j=p.now();if(j<E)return w=this.schedule(void 0,E-j),void b.add(w);V()}g.subscribe((0,T.x)(b,E=>{N=E,G=p.now(),w||(w=p.schedule(m,x),b.add(w))},()=>{V(),b.complete()},void 0,()=>{N=w=null}))})}},2722:(Y,B,u)=>{u.d(B,{R:()=>S});var h=u(4482),_=u(5403),y=u(8421),L=u(5032);function S(C){return(0,h.e)((O,U)=>{(0,y.Xf)(C).subscribe((0,_.x)(U,()=>U.complete(),L.Z)),!U.closed&&O.subscribe(U)})}},6547:(Y,B,u)=>{u.d(B,{tE:()=>$t,qm:()=>zt,X6:()=>Be,yG:()=>Ue});var h=u(6895),_=u(1571),y=u(3353),L=u(1135),S=u(7579),C=u(9646),bt=u(9300);function we(o){return(0,bt.h)((t,e)=>o<=e)}var yt=u(4671),Mt=u(4482),Et=u(5403);function It(o,t){return o===t}var ke=u(2722),q=u(1281),Dt=u(9841),Tt=u(7272),Ct=u(9751),Ot=u(5698),xt=u(5243),Fe=u(4004),wt=u(8675);const Re=new Set;let X,kt=(()=>{class o{constructor(e){this._platform=e,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Rt}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&function Ft(o){if(!Re.has(o))try{X||(X=document.createElement("style"),X.setAttribute("type","text/css"),document.head.appendChild(X)),X.sheet&&(X.sheet.insertRule(`@media ${o} {body{ }}`,0),Re.add(o))}catch(t){console.error(t)}}(e),this._matchMedia(e)}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(y.t4))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();function Rt(o){return{matches:"all"===o||""===o,media:o,addListener:()=>{},removeListener:()=>{}}}let Lt=(()=>{class o{constructor(e,s){this._mediaMatcher=e,this._zone=s,this._queries=new Map,this._destroySubject=new S.x}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return Le((0,q.Eq)(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){const r=Le((0,q.Eq)(e)).map(f=>this._registerQuery(f).observable);let d=(0,Dt.a)(r);return d=(0,Tt.z)(d.pipe((0,Ot.q)(1)),d.pipe(we(1),(0,xt.b)(0))),d.pipe((0,Fe.U)(f=>{const I={matches:!1,breakpoints:{}};return f.forEach(({matches:H,query:W})=>{I.matches=I.matches||H,I.breakpoints[W]=H}),I}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);const s=this._mediaMatcher.matchMedia(e),d={observable:new Ct.y(f=>{const I=H=>this._zone.run(()=>f.next(H));return s.addListener(I),()=>{s.removeListener(I)}}).pipe((0,wt.O)(s),(0,Fe.U)(({matches:f})=>({query:e,matches:f})),(0,ke.R)(this._destroySubject)),mql:s};return this._queries.set(e,d),d}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(kt),_.LFG(_.R0b))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();function Le(o){return o.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}function Be(o){return 0===o.buttons||0===o.offsetX&&0===o.offsetY}function Ue(o){const t=o.touches&&o.touches[0]||o.changedTouches&&o.changedTouches[0];return!(!t||-1!==t.identifier||null!=t.radiusX&&1!==t.radiusX||null!=t.radiusY&&1!==t.radiusY)}const Kt=new _.OlP("cdk-input-modality-detector-options"),Ht={ignoreKeys:[18,17,224,91,16]},Q=(0,y.i$)({passive:!0,capture:!0});let Gt=(()=>{class o{get mostRecentModality(){return this._modality.value}constructor(e,s,r,d){this._platform=e,this._mostRecentTarget=null,this._modality=new L.X(null),this._lastTouchMs=0,this._onKeydown=f=>{this._options?.ignoreKeys?.some(I=>I===f.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=(0,y.sA)(f))},this._onMousedown=f=>{Date.now()-this._lastTouchMs<650||(this._modality.next(Be(f)?"keyboard":"mouse"),this._mostRecentTarget=(0,y.sA)(f))},this._onTouchstart=f=>{Ue(f)?this._modality.next("keyboard"):(this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=(0,y.sA)(f))},this._options={...Ht,...d},this.modalityDetected=this._modality.pipe(we(1)),this.modalityChanged=this.modalityDetected.pipe(function At(o,t=yt.y){return o=o??It,(0,Mt.e)((e,s)=>{let r,d=!0;e.subscribe((0,Et.x)(s,f=>{const I=t(f);(d||!o(r,I))&&(d=!1,r=I,s.next(f))}))})}()),e.isBrowser&&s.runOutsideAngular(()=>{r.addEventListener("keydown",this._onKeydown,Q),r.addEventListener("mousedown",this._onMousedown,Q),r.addEventListener("touchstart",this._onTouchstart,Q)})}ngOnDestroy(){this._modality.complete(),this._platform.isBrowser&&(document.removeEventListener("keydown",this._onKeydown,Q),document.removeEventListener("mousedown",this._onMousedown,Q),document.removeEventListener("touchstart",this._onTouchstart,Q))}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(y.t4),_.LFG(_.R0b),_.LFG(h.K0),_.LFG(Kt,8))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();const Yt=new _.OlP("cdk-focus-monitor-default-options"),ie=(0,y.i$)({passive:!0,capture:!0});let $t=(()=>{class o{constructor(e,s,r,d,f){this._ngZone=e,this._platform=s,this._inputModalityDetector=r,this._origin=null,this._windowFocused=!1,this._originFromTouchInteraction=!1,this._elementInfo=new Map,this._monitoredElementCount=0,this._rootNodeFocusListenerCount=new Map,this._windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=window.setTimeout(()=>this._windowFocused=!1)},this._stopInputModalityDetector=new S.x,this._rootNodeFocusAndBlurListener=I=>{for(let W=(0,y.sA)(I);W;W=W.parentElement)"focus"===I.type?this._onFocus(I,W):this._onBlur(I,W)},this._document=d,this._detectionMode=f?.detectionMode||0}monitor(e,s=!1){const r=(0,q.fI)(e);if(!this._platform.isBrowser||1!==r.nodeType)return(0,C.of)(null);const d=(0,y.kV)(r)||this._getDocument(),f=this._elementInfo.get(r);if(f)return s&&(f.checkChildren=!0),f.subject;const I={checkChildren:s,subject:new S.x,rootNode:d};return this._elementInfo.set(r,I),this._registerGlobalListeners(I),I.subject}stopMonitoring(e){const s=(0,q.fI)(e),r=this._elementInfo.get(s);r&&(r.subject.complete(),this._setClasses(s),this._elementInfo.delete(s),this._removeGlobalListeners(r))}focusVia(e,s,r){const d=(0,q.fI)(e);d===this._getDocument().activeElement?this._getClosestElementsInfo(d).forEach(([I,H])=>this._originChanged(I,s,H)):(this._setOrigin(s),"function"==typeof d.focus&&d.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,s)=>this.stopMonitoring(s))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return 1===this._detectionMode||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,s){e.classList.toggle("cdk-focused",!!s),e.classList.toggle("cdk-touch-focused","touch"===s),e.classList.toggle("cdk-keyboard-focused","keyboard"===s),e.classList.toggle("cdk-mouse-focused","mouse"===s),e.classList.toggle("cdk-program-focused","program"===s)}_setOrigin(e,s=!1){this._ngZone.runOutsideAngular(()=>{this._origin=e,this._originFromTouchInteraction="touch"===e&&s,0===this._detectionMode&&(clearTimeout(this._originTimeoutId),this._originTimeoutId=setTimeout(()=>this._origin=null,this._originFromTouchInteraction?650:1))})}_onFocus(e,s){const r=this._elementInfo.get(s),d=(0,y.sA)(e);!r||!r.checkChildren&&s!==d||this._originChanged(s,this._getFocusOrigin(d),r)}_onBlur(e,s){const r=this._elementInfo.get(s);!r||r.checkChildren&&e.relatedTarget instanceof Node&&s.contains(e.relatedTarget)||(this._setClasses(s),this._emitOrigin(r,null))}_emitOrigin(e,s){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(s))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;const s=e.rootNode,r=this._rootNodeFocusListenerCount.get(s)||0;r||this._ngZone.runOutsideAngular(()=>{s.addEventListener("focus",this._rootNodeFocusAndBlurListener,ie),s.addEventListener("blur",this._rootNodeFocusAndBlurListener,ie)}),this._rootNodeFocusListenerCount.set(s,r+1),1==++this._monitoredElementCount&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe((0,ke.R)(this._stopInputModalityDetector)).subscribe(d=>{this._setOrigin(d,!0)}))}_removeGlobalListeners(e){const s=e.rootNode;if(this._rootNodeFocusListenerCount.has(s)){const r=this._rootNodeFocusListenerCount.get(s);r>1?this._rootNodeFocusListenerCount.set(s,r-1):(s.removeEventListener("focus",this._rootNodeFocusAndBlurListener,ie),s.removeEventListener("blur",this._rootNodeFocusAndBlurListener,ie),this._rootNodeFocusListenerCount.delete(s))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,s,r){this._setClasses(e,s),this._emitOrigin(r,s),this._lastFocusOrigin=s}_getClosestElementsInfo(e){const s=[];return this._elementInfo.forEach((r,d)=>{(d===e||r.checkChildren&&d.contains(e))&&s.push([d,r])}),s}_isLastInteractionFromInputLabel(e){const{_mostRecentTarget:s,mostRecentModality:r}=this._inputModalityDetector;if("mouse"!==r||!s||s===e||"INPUT"!==e.nodeName&&"TEXTAREA"!==e.nodeName||e.disabled)return!1;const d=e.labels;if(d)for(let f=0;f<d.length;f++)if(d[f].contains(s))return!0;return!1}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(_.R0b),_.LFG(y.t4),_.LFG(Gt),_.LFG(h.K0,8),_.LFG(Yt,8))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();const Ve="cdk-high-contrast-black-on-white",Ke="cdk-high-contrast-white-on-black",me="cdk-high-contrast-active";let zt=(()=>{class o{constructor(e,s){this._platform=e,this._document=s,this._breakpointSubscription=(0,_.f3M)(Lt).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return 0;const e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);const s=this._document.defaultView||window,r=s&&s.getComputedStyle?s.getComputedStyle(e):null,d=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),d){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return 2;case"rgb(255,255,255)":case"rgb(255,250,239)":return 1}return 0}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){const e=this._document.body.classList;e.remove(me,Ve,Ke),this._hasCheckedHighContrastMode=!0;const s=this.getHighContrastMode();1===s?e.add(me,Ve):2===s&&e.add(me,Ke)}}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(y.t4),_.LFG(h.K0))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},445:(Y,B,u)=>{u.d(B,{Is:()=>O,vT:()=>v});var h=u(1571),_=u(6895);const y=new h.OlP("cdk-dir-doc",{providedIn:"root",factory:function L(){return(0,h.f3M)(_.K0)}}),S=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;let O=(()=>{class D{constructor(T){this.value="ltr",this.change=new h.vpe,T&&(this.value=function C(D){const k=D?.toLowerCase()||"";return"auto"===k&&typeof navigator<"u"&&navigator?.language?S.test(navigator.language)?"rtl":"ltr":"rtl"===k?"rtl":"ltr"}((T.body?T.body.dir:null)||(T.documentElement?T.documentElement.dir:null)||"ltr"))}ngOnDestroy(){this.change.complete()}}return D.\u0275fac=function(T){return new(T||D)(h.LFG(y,8))},D.\u0275prov=h.Yz7({token:D,factory:D.\u0275fac,providedIn:"root"}),D})(),v=(()=>{class D{}return D.\u0275fac=function(T){return new(T||D)},D.\u0275mod=h.oAB({type:D}),D.\u0275inj=h.cJS({}),D})()},1281:(Y,B,u)=>{u.d(B,{Eq:()=>S,Ig:()=>_,fI:()=>O,su:()=>y});var h=u(1571);function _(v){return null!=v&&"false"!=`${v}`}function y(v,D=0){return function L(v){return!isNaN(parseFloat(v))&&!isNaN(Number(v))}(v)?Number(v):D}function S(v){return Array.isArray(v)?v:[v]}function O(v){return v instanceof h.SBq?v.nativeElement:v}},3353:(Y,B,u)=>{u.d(B,{Oy:()=>V,i$:()=>k,kV:()=>w,qK:()=>U,sA:()=>G,t4:()=>L});var h=u(1571),_=u(6895);let y;try{y=typeof Intl<"u"&&Intl.v8BreakIterator}catch{y=!1}let C,L=(()=>{class m{constructor(j){this._platformId=j,this.isBrowser=this._platformId?(0,_.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!y)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return m.\u0275fac=function(j){return new(j||m)(h.LFG(h.Lbi))},m.\u0275prov=h.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})();const O=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function U(){if(C)return C;if("object"!=typeof document||!document)return C=new Set(O),C;let m=document.createElement("input");return C=new Set(O.filter(E=>(m.setAttribute("type",E),m.type===E))),C}let v,g;function k(m){return function D(){if(null==v&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>v=!0}))}finally{v=v||!1}return v}()?m:!!m.capture}function w(m){if(function b(){if(null==g){const m=typeof document<"u"?document.head:null;g=!(!m||!m.createShadowRoot&&!m.attachShadow)}return g}()){const E=m.getRootNode?m.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&E instanceof ShadowRoot)return E}return null}function G(m){return m.composedPath?m.composedPath()[0]:m.target}function V(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}},3238:(Y,B,u)=>{u.d(B,{rD:()=>ve,BQ:()=>V,wG:()=>Ie,si:()=>De,pj:()=>pe,Kr:()=>fe,Id:()=>J,FD:()=>_e});var h=u(1571),_=u(6547),y=u(445),S=u(6895),C=u(3353),O=u(1281);const G=new h.OlP("mat-sanity-checks",{providedIn:"root",factory:function N(){return!0}});let V=(()=>{class c{constructor(i,a,l){this._sanityChecks=a,this._document=l,this._hasDoneGlobalChecks=!1,i._applyBodyHighContrastModeCssClasses(),this._hasDoneGlobalChecks||(this._hasDoneGlobalChecks=!0)}_checkIsEnabled(i){return!(0,C.Oy)()&&("boolean"==typeof this._sanityChecks?this._sanityChecks:!!this._sanityChecks[i])}}return c.\u0275fac=function(i){return new(i||c)(h.LFG(_.qm),h.LFG(G,8),h.LFG(S.K0))},c.\u0275mod=h.oAB({type:c}),c.\u0275inj=h.cJS({imports:[y.vT,y.vT]}),c})();function J(c){return class extends c{get disabled(){return this._disabled}set disabled(n){this._disabled=(0,O.Ig)(n)}constructor(...n){super(...n),this._disabled=!1}}}function pe(c,n){return class extends c{get color(){return this._color}set color(i){const a=i||this.defaultColor;a!==this._color&&(this._color&&this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),a&&this._elementRef.nativeElement.classList.add(`mat-${a}`),this._color=a)}constructor(...i){super(...i),this.defaultColor=n,this.color=n}}}function fe(c){return class extends c{get disableRipple(){return this._disableRipple}set disableRipple(n){this._disableRipple=(0,O.Ig)(n)}constructor(...n){super(...n),this._disableRipple=!1}}}function _e(c){return class extends c{updateErrorState(){const n=this.errorState,M=(this.errorStateMatcher||this._defaultErrorStateMatcher).isErrorState(this.ngControl?this.ngControl.control:null,this._parentFormGroup||this._parentForm);M!==n&&(this.errorState=M,this.stateChanges.next())}constructor(...n){super(...n),this.errorState=!1}}}let ve=(()=>{class c{isErrorState(i,a){return!!(i&&i.invalid&&(i.touched||a&&a.submitted))}}return c.\u0275fac=function(i){return new(i||c)},c.\u0275prov=h.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})();class be{constructor(n,i,a,l=!1){this._renderer=n,this.element=i,this.config=a,this._animationForciblyDisabledThroughCss=l,this.state=3}fadeOut(){this._renderer.fadeOutRipple(this)}}const ne=(0,C.i$)({passive:!0,capture:!0});class ye{constructor(){this._events=new Map,this._delegateEventHandler=n=>{const i=(0,C.sA)(n);i&&this._events.get(n.type)?.forEach((a,l)=>{(l===i||l.contains(i))&&a.forEach(M=>M.handleEvent(n))})}}addHandler(n,i,a,l){const M=this._events.get(i);if(M){const R=M.get(a);R?R.add(l):M.set(a,new Set([l]))}else this._events.set(i,new Map([[a,new Set([l])]])),n.runOutsideAngular(()=>{document.addEventListener(i,this._delegateEventHandler,ne)})}removeHandler(n,i,a){const l=this._events.get(n);if(!l)return;const M=l.get(i);M&&(M.delete(a),0===M.size&&l.delete(i),0===l.size&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,ne)))}}const se={enterDuration:225,exitDuration:150},oe=(0,C.i$)({passive:!0,capture:!0}),re=["mousedown","touchstart"],ae=["mouseup","mouseleave","touchend","touchcancel"];class z{constructor(n,i,a,l){this._target=n,this._ngZone=i,this._platform=l,this._isPointerDown=!1,this._activeRipples=new Map,this._pointerUpEventsRegistered=!1,l.isBrowser&&(this._containerElement=(0,O.fI)(a))}fadeInRipple(n,i,a={}){const l=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),M={...se,...a.animation};a.centered&&(n=l.left+l.width/2,i=l.top+l.height/2);const R=a.radius||function Ee(c,n,i){const a=Math.max(Math.abs(c-i.left),Math.abs(c-i.right)),l=Math.max(Math.abs(n-i.top),Math.abs(n-i.bottom));return Math.sqrt(a*a+l*l)}(n,i,l),Ce=n-l.left,Oe=i-l.top,ee=M.enterDuration,P=document.createElement("div");P.classList.add("mat-ripple-element"),P.style.left=Ce-R+"px",P.style.top=Oe-R+"px",P.style.height=2*R+"px",P.style.width=2*R+"px",null!=a.color&&(P.style.backgroundColor=a.color),P.style.transitionDuration=`${ee}ms`,this._containerElement.appendChild(P);const ce=window.getComputedStyle(P),de=ce.transitionDuration,te="none"===ce.transitionProperty||"0s"===de||"0s, 0s"===de||0===l.width&&0===l.height,K=new be(this,P,a,te);P.style.transform="scale3d(1, 1, 1)",K.state=0,a.persistent||(this._mostRecentTransientRipple=K);let le=null;return!te&&(ee||M.exitDuration)&&this._ngZone.runOutsideAngular(()=>{const ue=()=>this._finishRippleTransition(K),he=()=>this._destroyRipple(K);P.addEventListener("transitionend",ue),P.addEventListener("transitioncancel",he),le={onTransitionEnd:ue,onTransitionCancel:he}}),this._activeRipples.set(K,le),(te||!ee)&&this._finishRippleTransition(K),K}fadeOutRipple(n){if(2===n.state||3===n.state)return;const i=n.element,a={...se,...n.config.animation};i.style.transitionDuration=`${a.exitDuration}ms`,i.style.opacity="0",n.state=2,(n._animationForciblyDisabledThroughCss||!a.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){const i=(0,O.fI)(n);!this._platform.isBrowser||!i||i===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=i,re.forEach(a=>{z._eventManager.addHandler(this._ngZone,a,i,this)}))}handleEvent(n){"mousedown"===n.type?this._onMousedown(n):"touchstart"===n.type?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{ae.forEach(i=>{this._triggerElement.addEventListener(i,this,oe)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){0===n.state?this._startFadeOutTransition(n):2===n.state&&this._destroyRipple(n)}_startFadeOutTransition(n){const i=n===this._mostRecentTransientRipple,{persistent:a}=n.config;n.state=1,!a&&(!i||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){const i=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=3,null!==i&&(n.element.removeEventListener("transitionend",i.onTransitionEnd),n.element.removeEventListener("transitioncancel",i.onTransitionCancel)),n.element.remove()}_onMousedown(n){const i=(0,_.X6)(n),a=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+800;!this._target.rippleDisabled&&!i&&!a&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!(0,_.yG)(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;const i=n.changedTouches;for(let a=0;a<i.length;a++)this.fadeInRipple(i[a].clientX,i[a].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{!n.config.persistent&&(1===n.state||n.config.terminateOnPointerUp&&0===n.state)&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){const n=this._triggerElement;n&&(re.forEach(i=>z._eventManager.removeHandler(i,n,this)),this._pointerUpEventsRegistered&&ae.forEach(i=>n.removeEventListener(i,this,oe)))}}z._eventManager=new ye;const Ae=new h.OlP("mat-ripple-global-options");let Ie=(()=>{class c{get disabled(){return this._disabled}set disabled(i){i&&this.fadeOutAllNonPersistent(),this._disabled=i,this._setupTriggerEventsIfEnabled()}get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(i){this._trigger=i,this._setupTriggerEventsIfEnabled()}constructor(i,a,l,M,R){this._elementRef=i,this._animationMode=R,this.radius=0,this._disabled=!1,this._isInitialized=!1,this._globalOptions=M||{},this._rippleRenderer=new z(this,a,i,l)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:{...this._globalOptions.animation,..."NoopAnimations"===this._animationMode?{enterDuration:0,exitDuration:0}:{},...this.animation},terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(i,a=0,l){return"number"==typeof i?this._rippleRenderer.fadeInRipple(i,a,{...this.rippleConfig,...l}):this._rippleRenderer.fadeInRipple(0,0,{...this.rippleConfig,...i})}}return c.\u0275fac=function(i){return new(i||c)(h.Y36(h.SBq),h.Y36(h.R0b),h.Y36(C.t4),h.Y36(Ae,8),h.Y36(h.QbO,8))},c.\u0275dir=h.lG2({type:c,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,a){2&i&&h.ekj("mat-ripple-unbounded",a.unbounded)},inputs:{color:["matRippleColor","color"],unbounded:["matRippleUnbounded","unbounded"],centered:["matRippleCentered","centered"],radius:["matRippleRadius","radius"],animation:["matRippleAnimation","animation"],disabled:["matRippleDisabled","disabled"],trigger:["matRippleTrigger","trigger"]},exportAs:["matRipple"]}),c})(),De=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=h.oAB({type:c}),c.\u0275inj=h.cJS({imports:[V,V]}),c})()}}]);
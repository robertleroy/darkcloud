import{S as M,i as T,s as j,k as E,q as c,a as C,l as q,m as I,r as d,c as F,h as f,n as y,b as z,F as a,u as D,H,Q as A,o as B}from"../chunks/index.5089646f.js";import{s as G}from"../chunks/singletons.381a6a06.js";import{g as J}from"../chunks/navigation.4c330692.js";const K=()=>{const e=G;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},L={subscribe(e){return K().page.subscribe(e)}};function N(e){let t,s,n=e[1].status+"",i,m,l=e[1].error.message+"",h,S,v,g=e[1].url.pathname+"",_,V,$,p,Q,b;return{c(){t=E("div"),s=E("div"),i=c(n),m=c(": "),h=c(l),S=C(),v=E("q"),_=c(g),V=c("."),$=C(),p=E("div"),Q=c("redirecting in "),b=c(e[0]),this.h()},l(o){t=q(o,"DIV",{class:!0});var r=I(t);s=q(r,"DIV",{});var u=I(s);i=d(u,n),m=d(u,": "),h=d(u,l),S=F(u),v=q(u,"Q",{});var w=I(v);_=d(w,g),w.forEach(f),V=d(u,"."),u.forEach(f),$=F(r),p=q(r,"DIV",{});var k=I(p);Q=d(k,"redirecting in "),b=d(k,e[0]),k.forEach(f),r.forEach(f),this.h()},h(){y(t,"class","page")},m(o,r){z(o,t,r),a(t,s),a(s,i),a(s,m),a(s,h),a(s,S),a(s,v),a(v,_),a(s,V),a(t,$),a(t,p),a(p,Q),a(p,b)},p(o,[r]){r&2&&n!==(n=o[1].status+"")&&D(i,n),r&2&&l!==(l=o[1].error.message+"")&&D(h,l),r&2&&g!==(g=o[1].url.pathname+"")&&D(_,g),r&1&&D(b,o[0])},i:H,o:H,d(o){o&&f(t)}}}function O(e,t,s){let n;A(e,L,l=>s(1,n=l));let i=3,m=i*1e3;return B(()=>{setInterval(()=>{s(0,i-=1)},1e3),setTimeout(()=>{J("/")},m)}),[i,n]}let W=class extends M{constructor(t){super(),T(this,t,O,N,j,{})}};export{W as default};

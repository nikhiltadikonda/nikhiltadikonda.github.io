(this["webpackJsonpnikhiltadikonda.github.io"]=this["webpackJsonpnikhiltadikonda.github.io"]||[]).push([[0],{36:function(A,e,t){},57:function(A,e,t){},83:function(A,e,t){"use strict";t.r(e);var a=t(0),n=t.n(a),c=t(14),i=t.n(c),j=(t(56),t(57),t(36),t(85)),s=t(25),o=t(51),r=t(89),d=t.p+"static/media/profile.76907253.png",l=t(88),g=t(87),b=t(1);var h=function(){return Object(b.jsx)("div",{children:Object(b.jsx)(l.a,{bg:"dark navbar-dark",expand:"lg",children:Object(b.jsxs)(j.a,{children:[Object(b.jsx)("img",{alt:"",src:d,width:"50",height:"50",className:"d-inline-block align-top navbar-image"})," ",Object(b.jsx)(l.a.Brand,{href:"#",children:"Nikhil Tadikonda"}),Object(b.jsx)(l.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(b.jsx)(l.a.Collapse,{id:"collapse navbar-collapse",children:Object(b.jsxs)(g.a,{className:"navbar-nav ml-auto",children:[Object(b.jsx)(g.a.Link,{href:"#languages",children:"Languages"}),Object(b.jsx)(g.a.Link,{href:"#projects",children:"Projects"}),Object(b.jsx)(g.a.Link,{href:"#contact",children:"Contact"})]})})]})})})},u=t(6),O=t(86),I=t(50),B=t(24),p=t.n(B);var E=function(){var A=n.a.useState(null),e=Object(u.a)(A,2),t=e[0],a=e[1],c=n.a.useState(!1),i=Object(u.a)(c,2),j=i[0],s=i[1],o=n.a.useState(!1),d=Object(u.a)(o,2),l=d[0],g=d[1];return n.a.useEffect((function(){p.a.get("".concat("https://api.quotable.io/random")).then((function(A){s(200!==A.status),a(A.data)}))}),[]),t?Object(b.jsxs)("div",{children:[l?null:Object(b.jsxs)(r.a,{variant:"success",children:[Object(b.jsx)(r.a.Heading,{children:"Quote of the Moment"}),Object(b.jsx)("hr",{}),j?Object(b.jsx)(O.a,{animation:"border",variant:"success"}):t.content,Object(b.jsxs)("p",{className:"quote-author",children:[" - ",t.author]}),Object(b.jsx)("hr",{}),Object(b.jsx)("div",{className:"d-flex justify-content-end",children:Object(b.jsx)(I.a,{onClick:function(){return g(!l)},variant:"outline-success",children:"Close Quote"})})]}),Object(b.jsx)("div",{className:"quote-button",children:l&&Object(b.jsx)(I.a,{variant:"outline-success",onClick:function(){return g(!l)},children:"Show Quote"})})]}):null};var f=function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(h,{}),Object(b.jsx)("div",{className:"title",children:Object(b.jsx)(j.a,{children:Object(b.jsxs)(s.a,{children:[Object(b.jsxs)(o.a,{lg:6,children:[Object(b.jsxs)(r.a,{variant:"dark",children:[Object(b.jsx)(r.a.Heading,{children:"Hello, I'm Nikhil Tadikonda"}),Object(b.jsx)("hr",{}),Object(b.jsx)("p",{children:"I would like to be associated with a dynamic and progressive organization that will allow me to utilize my abilities and qualifications in the field to add value to the organization while providing me with opportunities for growth."})]}),Object(b.jsx)(E,{})]}),Object(b.jsx)(o.a,{lg:4,md:6,children:Object(b.jsx)("img",{className:"profile-img",src:d,width:"300",height:"250",alt:"profile"})})]})})})]})},x=t(90);var v=function(A){return Object(b.jsx)(o.a,{className:"project-column",lg:4,md:6,children:Object(b.jsxs)(x.a,{className:"project-card repo-card",children:[Object(b.jsx)(x.a.Title,{children:Object(b.jsx)("h3",{className:"project-box-title",children:A.name})}),Object(b.jsx)("hr",{}),Object(b.jsxs)(x.a.Body,{children:[Object(b.jsx)("p",{children:null==A.description?"No description available":A.description.length>100?A.description.substring(0,100)+"...":A.description}),Object(b.jsx)(I.a,{variant:"primary",children:"Open on Github"})]})]})})};var D=function(){var A=n.a.useState(null),e=Object(u.a)(A,2),t=e[0],a=e[1];return n.a.useEffect((function(){p.a.get("".concat("https://api.github.com/users/nikhiltadikonda/repos")).then((function(A){a(A.data)}))}),[]),t?Object(b.jsx)("div",{className:"projects",children:Object(b.jsxs)("section",{id:"projects",children:[Object(b.jsx)("h1",{id:"project-title",children:"My Projects"}),Object(b.jsx)("p",{id:"project-subtitle",children:"Well, I made some useful projects"}),Object(b.jsx)(s.a,{children:t.map(v)})]})}):null},Q=t.p+"static/media/github.d3263084.png";var m=function(A){return Object(b.jsx)("img",{className:"social-icons",src:Q,width:"30",height:"30",alt:"github"})};var C=function(){return Object(b.jsxs)("div",{className:"contact",children:[Object(b.jsxs)("section",{id:"contact",children:[Object(b.jsx)("img",{className:"profile-img-bottom",src:d,width:"90",height:"90",alt:"profile"}),Object(b.jsx)("h3",{className:"cta-heading",children:"Looks Fascinating?"}),Object(b.jsx)(I.a,{variant:"dark",size:"lg",children:"Contact Me"})]}),Object(b.jsxs)("footer",{id:"footer",children:[Object(b.jsx)(m,{}),Object(b.jsx)(m,{}),Object(b.jsx)(m,{}),Object(b.jsx)(m,{}),Object(b.jsxs)("p",{className:"copyright-message",children:["\xa9 Copyright ",2021===(new Date).getFullYear()?(new Date).getFullYear():"2021 - "+(new Date).getFullYear(),", All Rights Reserved."]})]})]})};var q=function(){return Object(b.jsxs)(o.a,{lg:4,className:"language-box",children:[Object(b.jsx)("img",{className:"language-icon",src:"data:image/png;base64,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",width:"70",height:"70",alt:"language"}),Object(b.jsx)("h3",{className:"language-description",children:"Lorem ipsum"})]})};var G=function(){return Object(b.jsx)("div",{children:Object(b.jsxs)("section",{id:"languages",children:[Object(b.jsx)("h2",{className:"language-title",children:"Languages I'm perfect in: "}),Object(b.jsxs)(s.a,{children:[Object(b.jsx)(q,{}),Object(b.jsx)(q,{}),Object(b.jsx)(q,{})]})]})})};var V=function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(f,{}),Object(b.jsx)(G,{}),Object(b.jsx)(D,{}),Object(b.jsx)(C,{})]})},w=function(A){A&&A instanceof Function&&t.e(3).then(t.bind(null,91)).then((function(e){var t=e.getCLS,a=e.getFID,n=e.getFCP,c=e.getLCP,i=e.getTTFB;t(A),a(A),n(A),c(A),i(A)}))};i.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(V,{})}),document.getElementById("root")),w()}},[[83,1,2]]]);
//# sourceMappingURL=main.c6a481fb.chunk.js.map
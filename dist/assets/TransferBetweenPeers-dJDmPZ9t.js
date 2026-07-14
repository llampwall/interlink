import{$c as e,Ag as t,An as n,Ar as r,Ba as i,Cg as a,Dr as o,Fg as s,Ga as c,Hg as l,Hr as u,In as d,K as f,Kg as p,Lg as m,Ln as h,Mn as g,Ng as _,Qn as v,R as y,Sg as b,Ug as x,Vg as S,Vi as C,Wg as w,Wt as ee,Yg as te,Zc as ne,dp as T,e_ as E,ep as re,gr as D,gt as O,h as ie,jg as k,kg as ae,lp as oe,nr as se,pp as A,rr as ce,ru as le,wi as ue,wn as j,yl as de,yt as M,zg as fe}from"./shared-components-CmoVdS4C.js";import{r as pe}from"./stars-DUKVkll3.js";import{n as me}from"./usePrevious-B5D1Ql93.js";import{n as he}from"./animatedAssets-DGakmVlt.js";import{W as ge,ft as _e,ht as ve,xt as ye,yt as be}from"./ActionMessage-Da7WApKm.js";var N={root:`Kdv89j1l`,top:`_0EdTY2mJ`,badge:`TvB5YSlK`,text:`lZY9nXge`},xe=m(({peer:e,avatarWebPhoto:n,avatarSize:r,text:i,badgeText:a,badgeIcon:o,className:s,badgeClassName:c,badgeIconClassName:l,textClassName:u,onClick:d})=>{let f=j();return k(`div`,{className:A(N.root,d&&N.clickable,s),onClick:d,children:[k(`div`,{className:N.top,children:[t(O,{size:r,peer:e,webPhoto:n}),a&&k(`div`,{className:A(N.badge,c),dir:f.isRtl?`rtl`:`ltr`,children:[o&&t(T,{name:o,className:l}),a]})]}),i&&t(`p`,{className:A(N.text,u),children:i})]})}),P=new D(`#0098EA`),F={blue:P,blueGradient:[new D(`#0158AF`),new D(`#67D0FF`)],purple:new D(`#966FFE`),purpleGradient:[new D(`#6B93FF`),new D(`#E46ACE`)],gold:new D(`#FFBF0A`),goldGradient:[new D(`#FDEB32`),new D(`#D75902`)]},Se={particleCount:5,distanceLimit:1,fadeInTime:.05,minLifetime:3,maxLifetime:3,maxStartTimeDelay:0,selfDestroyTime:3,minSpawnRadius:5,maxSpawnRadius:50},I={width:350,height:230,particleCount:100,color:P,speed:18,baseSize:6,minSpawnRadius:35,maxSpawnRadius:70,distanceLimit:.7,fadeInTime:.25,fadeOutTime:1,minLifetime:4,maxLifetime:6,maxStartTimeDelay:3,edgeFadeZone:50,centerShift:[0,0],accelerationFactor:3,selfDestroyTime:0},Ce=.67,we=1.33,Te=2.2,L=new Map;function Ee(e,t){let n=L.get(e);return n||(n=De(e),L.set(e,n)),n.addSystem(t)}function De(e){let t=e.getContext(`webgl`,{alpha:!0,antialias:!1,preserveDrawingBuffer:!1});if(!t)throw Error(`WebGL not supported`);let n=Ae(t,t.VERTEX_SHADER,Oe),r=Ae(t,t.FRAGMENT_SHADER,ke);if(!n||!r)throw Error(`Failed to create shaders`);let i=je(t,n,r);if(!i)throw Error(`Failed to create shader program`);let a=window.devicePixelRatio||1,o=new Map,s={attributes:{startPosition:t.getAttribLocation(i,`a_startPosition`),velocity:t.getAttribLocation(i,`a_velocity`),startTime:t.getAttribLocation(i,`a_startTime`),lifetime:t.getAttribLocation(i,`a_lifetime`),size:t.getAttribLocation(i,`a_size`),baseOpacity:t.getAttribLocation(i,`a_baseOpacity`),color:t.getAttribLocation(i,`a_color`)},uniforms:{resolution:t.getUniformLocation(i,`u_resolution`),time:t.getUniformLocation(i,`u_time`),canvasWidth:t.getUniformLocation(i,`u_canvasWidth`),canvasHeight:t.getUniformLocation(i,`u_canvasHeight`),accelerationFactor:t.getUniformLocation(i,`u_accelerationFactor`),fadeInTime:t.getUniformLocation(i,`u_fadeInTime`),fadeOutTime:t.getUniformLocation(i,`u_fadeOutTime`),edgeFadeZone:t.getUniformLocation(i,`u_edgeFadeZone`),rotationMatrices:t.getUniformLocation(i,`u_rotationMatrices`),spawnCenter:t.getUniformLocation(i,`u_spawnCenter`)}},c,l;function u(e){let n=new Me(e.seed),{config:r}=e,i=new Float32Array(r.particleCount*2),o=new Float32Array(r.particleCount*2),s=new Float32Array(r.particleCount),c=new Float32Array(r.particleCount),l=new Float32Array(r.particleCount),u=new Float32Array(r.particleCount),d=new Float32Array(r.particleCount*3);for(let t=0;t<r.particleCount;t++){let f=n.next()*Math.PI*2,p=n.nextBetween(r.minSpawnRadius,r.maxSpawnRadius),m=Math.cos(f),h=Math.sin(f),g=e.centerX+m*p,_=e.centerY+h*p;i[t*2]=g*a,i[t*2+1]=_*a,c[t]=n.nextBetween(r.minLifetime,r.maxLifetime),s[t]=n.next()*r.maxStartTimeDelay;let v=n.nextBetween(e.avgDistance*r.distanceLimit*.5,e.avgDistance*r.distanceLimit)/c[t]*a;o[t*2]=m*v,o[t*2+1]=h*v;let y=n.next();y<.3?l[t]=r.baseSize*Ce*a:y<.7?l[t]=r.baseSize*we*a:l[t]=r.baseSize*Te*a,u[t]=n.nextBetween(.3,.8);let[b,x,S]=Pe(r.color,n).coords;d[t*3]=b||0,d[t*3+1]=x||0,d[t*3+2]=S||0}t.bindBuffer(t.ARRAY_BUFFER,e.buffers.startPosition),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.velocity),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.startTime),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.lifetime),t.bufferData(t.ARRAY_BUFFER,c,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.size),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.baseOpacity),t.bufferData(t.ARRAY_BUFFER,u,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.color),t.bufferData(t.ARRAY_BUFFER,d,t.STATIC_DRAW)}function d(){let n=0,r=0;o.forEach(e=>{n=Math.max(n,e.config.width),r=Math.max(r,e.config.height)}),o.size===0&&(n=I.width,r=I.height),(e.width!==n*a||e.height!==r*a)&&(e.width=n*a,e.height=r*a,e.style.width=n+`px`,e.style.height=r+`px`),t.viewport(0,0,e.width,e.height)}function f(){t.useProgram(i),t.uniform2f(s.uniforms.resolution,e.width,e.height),t.uniformMatrix2fv(s.uniforms.rotationMatrices,!1,Ne()),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,0)}function p(e){c&&=(t.clear(t.COLOR_BUFFER_BIT),o.forEach(n=>{let r=(e-n.startTime)/1e3;t.uniform1f(s.uniforms.time,r),t.uniform1f(s.uniforms.canvasWidth,n.config.width*a),t.uniform1f(s.uniforms.canvasHeight,n.config.height*a),t.uniform1f(s.uniforms.accelerationFactor,n.config.accelerationFactor),t.uniform1f(s.uniforms.fadeInTime,n.config.fadeInTime),t.uniform1f(s.uniforms.fadeOutTime,n.config.fadeOutTime),t.uniform1f(s.uniforms.edgeFadeZone,n.config.edgeFadeZone*a),t.uniform2f(s.uniforms.spawnCenter,n.centerX*a,n.centerY*a),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.startPosition),t.enableVertexAttribArray(s.attributes.startPosition),t.vertexAttribPointer(s.attributes.startPosition,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.velocity),t.enableVertexAttribArray(s.attributes.velocity),t.vertexAttribPointer(s.attributes.velocity,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.startTime),t.enableVertexAttribArray(s.attributes.startTime),t.vertexAttribPointer(s.attributes.startTime,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.lifetime),t.enableVertexAttribArray(s.attributes.lifetime),t.vertexAttribPointer(s.attributes.lifetime,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.size),t.enableVertexAttribArray(s.attributes.size),t.vertexAttribPointer(s.attributes.size,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.baseOpacity),t.enableVertexAttribArray(s.attributes.baseOpacity),t.vertexAttribPointer(s.attributes.baseOpacity,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.color),t.enableVertexAttribArray(s.attributes.color),t.vertexAttribPointer(s.attributes.color,3,t.FLOAT,!1,0,0),t.drawArrays(t.POINTS,0,n.config.particleCount)}),requestAnimationFrame(p))}function m(e){let n=_(),r={...I,...e},i={id:n,config:r,buffers:{startPosition:t.createBuffer(),velocity:t.createBuffer(),startTime:t.createBuffer(),lifetime:t.createBuffer(),size:t.createBuffer(),baseOpacity:t.createBuffer(),color:t.createBuffer()},startTime:performance.now(),seed:Math.floor(Math.random()*1e6),centerX:r.width/2+r.centerShift[0],centerY:r.height/2+r.centerShift[1],avgDistance:(r.width/2+r.height/2)/2};return o.set(n,i),u(i),d(),r.selfDestroyTime&&(i.selfDestroyTimeout=window.setTimeout(()=>{g(n)},r.selfDestroyTime*1e3)),o.size===1&&(f(),l=h.subscribe(()=>{let e=!h();e&&!c?c=requestAnimationFrame(p):!e&&c&&(cancelAnimationFrame(c),c=void 0)}),c=requestAnimationFrame(p)),()=>g(n)}function g(e){let n=o.get(e);n&&(n.selfDestroyTimeout&&clearTimeout(n.selfDestroyTimeout),Object.values(n.buffers).forEach(e=>{e&&t.deleteBuffer(e)}),o.delete(e),o.size===0&&v())}function v(){c!==void 0&&(cancelAnimationFrame(c),c=void 0),l?.(),o.clear(),t.deleteProgram(i),t.deleteShader(n),t.deleteShader(r),L.delete(e)}return{addSystem:m}}var Oe=`
    attribute vec2 a_startPosition;
    attribute vec2 a_velocity;
    attribute float a_startTime;
    attribute float a_lifetime;
    attribute float a_size;
    attribute float a_baseOpacity;
    attribute vec3 a_color;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_canvasWidth;
    uniform float u_canvasHeight;
    uniform float u_accelerationFactor;
    uniform float u_fadeInTime;
    uniform float u_fadeOutTime;
    uniform float u_edgeFadeZone;
    uniform mat2 u_rotationMatrices[18];
    uniform vec2 u_spawnCenter;

    varying float v_opacity;
    varying vec3 v_color;

    void main() {
        float totalAge = u_time - a_startTime;
        float age = mod(totalAge, a_lifetime);

        // For the initial animation, fade in all particles
        float globalFadeIn = min(u_time / u_fadeInTime, 1.0);

        float lifeRatio = age / a_lifetime;

        // Calculate rotation based on completed lifecycles
        float lifecycleCount = floor(totalAge / a_lifetime);
        int rotationIndex = int(mod(lifecycleCount, 18.0));

        // Get rotation matrix
        mat2 rotationMatrix = u_rotationMatrices[rotationIndex];

        // Rotate start position around spawn center
        vec2 startOffset = a_startPosition - u_spawnCenter;
        vec2 rotatedStartOffset = rotationMatrix * startOffset;
        vec2 rotatedStartPosition = u_spawnCenter + rotatedStartOffset;

        // Apply rotation matrix to velocity
        vec2 rotatedVelocity = rotationMatrix * a_velocity;

        // Apply shoot-out effect: fast initial speed that slows down
        float speedMultiplier = 1.0 + u_accelerationFactor * exp(-3.0 * lifeRatio);

        vec2 position = rotatedStartPosition + rotatedVelocity * age * speedMultiplier;

        float opacity = 1.0;
        if (lifeRatio < u_fadeInTime / a_lifetime) {
            opacity = (lifeRatio * a_lifetime) / u_fadeInTime;
        } else if (lifeRatio > 1.0 - u_fadeOutTime / a_lifetime) {
            opacity = (1.0 - lifeRatio) * a_lifetime / u_fadeOutTime;
        }
        opacity *= a_baseOpacity * globalFadeIn;

        float distToLeft = position.x;
        float distToRight = u_canvasWidth - position.x;
        float distToTop = position.y;
        float distToBottom = u_canvasHeight - position.y;
        float distToEdge = min(min(distToLeft, distToRight), min(distToTop, distToBottom));

        if (distToEdge < u_edgeFadeZone) {
            opacity *= distToEdge / u_edgeFadeZone;
        }

        vec2 clipSpace = ((position / u_resolution) * 2.0 - 1.0) * vec2(1, -1);
        gl_Position = vec4(clipSpace, 0, 1);
        gl_PointSize = a_size;
        v_opacity = opacity;
        v_color = a_color;
    }
`,ke=`
    precision mediump float;

    varying float v_opacity;
    varying vec3 v_color;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);

        // Create a four-pointed star
        float absX = abs(coord.x);
        float absY = abs(coord.y);

        // Star parameters
        float innerSize = 0.12;    // Size of center square
        float armLength = 0.45;    // Length of star arms
        float armWidth = 0.08;     // Half-width of star arms at base

        float dist = 1.0; // Default to outside

        // Center square
        if (absX <= innerSize && absY <= innerSize) {
            dist = max(absX, absY) - innerSize;
        }
        // Horizontal arms (left and right points)
        else if (absY <= armWidth && absX <= armLength) {
            // Taper the arms - they get narrower toward the tips
            float normalizedX = (absX - innerSize) / (armLength - innerSize);
            float taperFactor = 1.0 - normalizedX * 0.8; // Taper to 20% of original width
            float currentArmWidth = armWidth * taperFactor;
            dist = absY - currentArmWidth;
        }
        // Vertical arms (top and bottom points)
        else if (absX <= armWidth && absY <= armLength) {
            // Taper the arms - they get narrower toward the tips
            float normalizedY = (absY - innerSize) / (armLength - innerSize);
            float taperFactor = 1.0 - normalizedY * 0.8; // Taper to 20% of original width
            float currentArmWidth = armWidth * taperFactor;
            dist = absX - currentArmWidth;
        }

        // Use smoothstep for anti-aliasing to reduce subpixel artifacts
        float alpha = 1.0 - smoothstep(-0.01, 0.01, dist);

        if (alpha <= 0.0) {
            discard;
        }

        gl_FragColor = vec4(v_color * v_opacity * alpha, v_opacity * alpha);
    }
`;function Ae(e,t,n){let r=e.createShader(t);if(r){if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){e.deleteShader(r);return}return r}}function je(e,t,n){let r=e.createProgram();if(r){if(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){e.deleteProgram(r);return}return r}}var Me=class{seed;constructor(e){this.seed=e}next(){return this.seed=(this.seed*9301+49297)%233280,this.seed/233280}nextBetween(e,t){return e+(t-e)*this.next()}},R;function Ne(){if(!R){R=new Float32Array(72);for(let e=0;e<18;e++){let t=220*Math.PI/180*e,n=Math.cos(t),r=Math.sin(t);R[e*4]=n,R[e*4+1]=r,R[e*4+2]=-r,R[e*4+3]=n}}return R}function Pe(e,t){if(e instanceof D)return e;let[n,r]=e,[i,a,o]=n.coords,[s,c,l]=r.coords;return new D(`srgb`,[t.nextBetween(i||0,s||0),t.nextBetween(a||0,c||0),t.nextBetween(o||0,l||0)])}var Fe={sparkles:`JxY8hVTW`},Ie={centerShift:[0,-36]},Le=8,Re=m(({color:e=`purple`,centerShift:n=Ie.centerShift,isDisabled:r,className:i,onRequestAnimation:a})=>{let o=w(),s=w(0);return l(()=>{if(!r)return Ee(o.current,{color:F[`${e}Gradient`],centerShift:n})},[n,e,r]),S(()=>{a&&a(()=>{if(r)return;let t=Date.now();t-s.current<Le||(s.current=t,Ee(o.current,{color:F[`${e}Gradient`],centerShift:n,...Se}))})},[n,e,r,a]),t(`canvas`,{ref:o,className:A(Fe.sparkles,i)})}),ze={root:`CHDf16MJ`,diamond:`UM7C8oRj`},Be=``+new URL(`diamond-57JalFxA.png`,import.meta.url).href,z=5,B=1,Ve=300,He=1500,V,H=!0;function Ue({className:n,onMouseMove:r}){let[i,a]=p(B),o=e(()=>{V&&=(clearTimeout(V),void 0),V=window.setTimeout(()=>{let e=Date.now();H=!0,ee(()=>{if(!H)return!1;let t=Math.min((Date.now()-e)/He,1),n=(z-B)*(1-Ge(t));return a(n),H=t<1&&n>1,H},E)},Ve),H=!1,a(z),r()});return t(`div`,{className:A(ze.root,n),children:t(`div`,{className:ze.diamond,onMouseMove:o,children:t(me,{speed:i,size:130,tgsUrl:he.Diamond,previewUrl:Be,nonInteractive:!0,noLoop:!1})})})}var We=m(Ue);function Ge(e){return 1-(1-e)**2}var U={root:`QcfrGLdX`,star:`nDPg-zs5`,star_purple:`-f2S1Tk6`,starPurple:`-f2S1Tk6`},W=50;function Ke({className:n,color:r,centerShift:i,onMouseMove:a}){let o=w(),s=e(e=>{let t=e.currentTarget.getBoundingClientRect(),n=t.left+t.width/2+i[0],r=t.top+t.height/2+i[1],s=e.clientX-n,c=e.clientY-r,l=Math.max(-1,Math.min(1,s/W)),u=Math.max(-1,Math.min(1,c/W)),d=l*40,f=-u*40;E(()=>{o.current.style.transform=`scale(1.1) rotateX(${f}deg) rotateY(${d}deg)`}),a()}),c=e(()=>{E(()=>{o.current.style.transform=``})});return t(`div`,{className:A(U.root,n),onMouseMove:s,onMouseLeave:c,children:t(`div`,{ref:o,className:A(U.star,U[`star_${r}`]),role:`img`,"aria-label":`Telegram Stars`})})}var qe=m(Ke),G={root:`cK6KQXnQ`,"ai-egg":`ZP86O9Hy`,aiEgg:`ZP86O9Hy`,title:`xRm-Im3m`,description:`IQdQ9MU9`,particles:`_8ooQ3s8b`,stickerWrapper:`hHs2sTV-`,cocoon:`Rlhm9gZk`},Je=``+new URL(`cocoon-DzgJltGQ.webp`,import.meta.url).href,K=8*u,q={centerShift:[0,-36]};function Ye({model:n,sticker:r,color:i,title:a,description:o,isDisabled:s,className:c,modelClassName:l}){let u=w(),d=w(),f=e(()=>{d.current?.()}),p=e(e=>{d.current=e});return k(`div`,{className:A(G.root,G[n],c),children:[t(Re,{color:i,centerShift:q.centerShift,isDisabled:s,className:G.particles,onRequestAnimation:p}),n===`swaying-star`?t(qe,{className:l,color:i,centerShift:q.centerShift,onMouseMove:f}):n===`ai-egg`?t(`img`,{src:Je,alt:``,role:`presentation`,"aria-hidden":`true`,className:A(G.cocoon,l),draggable:!1,onMouseMove:f}):n===`speeding-diamond`?t(We,{className:l,onMouseMove:f}):n===`sticker`&&r&&t(`div`,{ref:u,className:A(G.stickerWrapper,l),style:`width: ${K}px; height: ${K}px`,onMouseMove:f,children:t(g,{containerRef:u,sticker:r,size:K,shouldPreloadPreview:!0,shouldLoop:!0})}),t(`h2`,{className:G.title,children:a}),t(`div`,{className:G.description,children:o})]})}var Xe=m(Ye),J={root:`_7NV36hp3`,wrapper:`_32sWnI-2`,down:`DkDmNeYG`,frame:`M0hUT4cv`,video:`eWi57MWV`,placeholder:`A38HRiXg`},Ze=``+new URL(`DeviceFrame-Dqm_t18H.svg`,import.meta.url).href,Qe=m(({videoId:e,videoThumbnail:n,isActive:r,isReverseAnimation:i,isDown:a,index:o,className:s,wrapperClassName:c})=>{let l=v(e?`document${e}`:void 0),u=ve(n?.dataUri),f=pe(l);return t(`div`,{className:A(J.root,s),children:k(`div`,{className:A(J.wrapper,i&&J.reverse,a&&J.down,c),id:o===void 0?void 0:`premium_feature_preview_video_${o}`,children:[t(`img`,{src:Ze,alt:``,className:J.frame,draggable:!1}),!e&&t(`div`,{className:J.placeholder}),n&&t(`canvas`,{ref:u,className:J.video}),e&&t(d,{canPlay:!!r,className:A(J.video,f),src:l,disablePictureInPicture:!0,playsInline:!0,muted:!0,loop:!0})]})})}),Y={options:`Upert7zo`,option:`_2X6-9ciP`,active:`zpGahRpW`,wideOption:`dI8-J8yI`,optionTop:`wgA5YkCl`,stackedStars:`TZ71sXrE`,stackedStar:`_6CGkOJue`,optionBottom:`GRPtw1Lm`,moreOptions:`cY6CHTaj`,iconDown:`qdRs-uv4`},$e=6,et=m(({isActive:e,className:r,options:i,selectedStarOption:a,selectedStarCount:o,starsNeeded:s,onClick:c})=>{let l=n(),u=j(),[d,f,p]=ce();S(()=>{e||p()},[e]);let[m,h]=x(()=>{if(!i)return[void 0,!1];let e=i.reduce((e,t)=>e.stars>t.stars?e:t),t=s&&e.stars<s,n=[],r=0,a=!1;return i.forEach((e,o)=>{if(e.isExtended||r++,!(s&&!t&&e.stars<s)){if(!d&&e.isExtended){a=!0;return}n.push({option:e,starsCount:Math.min(r,$e),isWide:o===i.length-1})}}),[n,a]},[d,i,s]);return k(`div`,{className:A(Y.options,r),children:[m?.map(({option:e,starsCount:n,isWide:r})=>{let i=m?.length%2==0,s=e===a,d;return e&&`winners`in e&&(d=(e.winners.find(e=>e.users===o)||e.winners.reduce((e,t)=>t.users>e.users?t:e,e.winners[0]))?.perUserStars),k(`div`,{className:A(Y.option,!i&&r&&Y.wideOption,s&&Y.active),onClick:()=>c?.(e),children:[k(`div`,{className:Y.optionTop,children:[`+`,ue(e.stars),t(`div`,{className:Y.stackedStars,dir:u.isRtl?`ltr`:`rtl`,children:Array.from({length:n}).map(()=>t(oe,{className:Y.stackedStar,type:`gold`,size:`big`}))})]}),t(`div`,{className:Y.optionBottom,children:re(u,e.amount,e.currency)}),(s||a&&`winners`in a)&&!!d&&t(`div`,{className:Y.optionBottom,children:t(`div`,{className:Y.perUserStars,children:ne(l(`BoostGift.Stars.PerUser`,ue(d)))})})]},e.stars)}),!d&&h&&k(M,{className:Y.moreOptions,isText:!0,noForcedUpperCase:!0,onClick:f,children:[l(`Stars.Purchase.ShowMore`),t(T,{className:Y.iconDown,name:`down`})]})]})}),X={content:`j63Xdo6p`,fixedHeight:`E-xx83T0`,withSearch:`sT1YPCzK`,header:`RwB3BKcO`,buttonWrapper:`Z-xvJZEk`},tt=`.${be.pickerList}`,nt=m(({confirmButtonText:e,isConfirmDisabled:r,shouldAdaptToSearch:i,withFixedHeight:a,onConfirm:o,withPremiumGradient:s,itemsContainerSelector:c=tt,...l})=>{let u=n(),d=!!(e||o),p=w();return ge({containerRef:p,selector:`.modal-content ${c}`,isBottomNotch:d,shouldHideTopNotch:!0},[l.isOpen]),k(f,{...l,dialogRef:p,isSlim:!0,className:A(i&&X.withSearch,a&&X.fixedHeight,l.className),contentClassName:A(X.content,l.contentClassName),headerClassName:A(X.header,l.headerClassName),isCondensedHeader:!0,children:[l.children,d&&t(`div`,{className:X.buttonWrapper,children:t(M,{withPremiumGradient:s,onClick:o||l.onClose,color:`primary`,disabled:r,children:e||u(`Confirm`)})})]})}),Z={table:`RMEi5Sgb`,cell:`AEl8NMjg`,title:`IypKoG1m`,value:`ZO-KCUSl`,fullWidth:`_1WIqSuNB`,chatItem:`J6it2-iy`},rt=m(({tableData:n,className:r,onChatClick:i})=>{let{openChat:a}=b(),o=e(e=>{i?i(e):a({id:e})});if(n?.length)return t(`div`,{className:A(Z.table,r),children:n.map(([e,n])=>k(ae,{children:[!!e&&t(`div`,{className:A(Z.cell,Z.title),children:e}),t(`div`,{className:A(Z.cell,Z.value,!e&&Z.fullWidth),children:typeof n==`object`&&`chatId`in n?t(ye,{peerId:n.chatId,className:Z.chatItem,forceShowSelf:!0,withEmojiStatus:n.withEmojiStatus,clickArg:n.chatId,onClick:o}):n})]}))})}),Q={content:`rIjOLQyf`,noFooter:`ssGgYoZw`,avatar:`IdvEatvm`},it=m(({isOpen:n,title:r,tableData:i,headerAvatarPeer:a,header:o,modalHeader:s,footer:c,buttonText:l,className:u,contentClassName:d,tableClassName:p,hasBackdrop:m,closeButtonColor:h,moreMenuItems:g,headerRightToolBar:_,onClose:v,onButtonClick:y,withBalanceBar:x,isLowStackPriority:S,currencyInBalanceBar:C})=>{let{openChat:w}=b(),ee=e(e=>{w({id:e}),v()});return k(f,{isOpen:n,hasCloseButton:!!r,hasAbsoluteCloseButton:!r,absoluteCloseButtonColor:h||(m?`translucent-white`:void 0),isSlim:!0,header:s,title:r,className:u,contentClassName:A(Q.content,d),moreMenuItems:g,headerRightToolBar:_,onClose:v,withBalanceBar:x,currencyInBalanceBar:C,isLowStackPriority:S,children:[a&&t(O,{peer:a,size:`jumbo`,className:Q.avatar}),o,t(rt,{tableData:i,className:p,onChatClick:ee}),c,l&&t(M,{className:c?void 0:Q.noFooter,onClick:y||v,children:l})]})}),$={root:`FEEwg5rl`,secondary:`_51eeI1vd`,topIcon:`_0fVPMdEi`,premiumGradient:`oEaPoig5`,content:`_7xJ2IMc7`,listItems:`_4Smlf3-h`,listItemTitle:`lPVHA-w3`,separator:`V6iMhrLh`},at=m(({className:e,isOpen:n,listItemData:r,headerIconName:i,headerIconPremiumGradient:a,header:o,footer:s,buttonText:c,hasBackdrop:l,absoluteCloseButtonColor:u,withSeparator:d,contentClassName:p,onClose:m,onButtonClick:h})=>k(f,{isOpen:n,className:A($.root,e),contentClassName:A($.content,p),hasAbsoluteCloseButton:!0,absoluteCloseButtonColor:u||(l?`translucent-white`:void 0),onClose:m,children:[i&&t(`div`,{className:A($.topIcon,a&&$.premiumGradient),children:t(T,{name:i})}),o,t(`div`,{className:$.listItems,children:r?.map(([e,n,r])=>k(y,{isStatic:!0,multiline:!0,icon:e,className:$.listItem,children:[t(`span`,{className:A(`title`,$.listItemTitle),children:n}),t(`span`,{className:`subtitle`,children:r})]}))}),d&&t(ie,{className:$.separator}),s,!!c&&t(M,{onClick:h||m,children:c})]}));function ot(e,t,n){let[r,i]=p(),{isFrozen:a,updateWhenUnfrozen:s}=st(),c=_e(t,!0);return o(()=>{if(a){s();return}c(()=>{i(e())})},[...n,a]),r}function st(){let e=w(!1),t=fe(()=>{e.current=!0},[]),n=s();return se(ct,fe(()=>{e.current&&(e.current=!1,n())},[n])),{isFrozen:te(),updateWhenUnfrozen:t}}function ct(){}var lt=300;async function ut(e){let t=await de(`searchChats`,{query:e});if(t)return[...t.accountResultIds,...t.globalResultIds]}function dt(e){return async t=>{let n=t.trim();if(i(e)){let t=le(a(),e.id)?.members?.map(e=>e.userId)||[];return n?C({ids:t,query:n,type:`user`}):t}let r=(await de(`fetchMembers`,{chat:e,memberFilter:n?`search`:`recent`,query:n}))?.members?.map(e=>e.userId)||[];if(!c(e))return r;if(!n)return[...r,e.id];let o=C({ids:[e.id],query:n,type:`chat`});return[...r,...o]}}function ft({query:t,queryFn:n=ut,defaultValue:i,debounceTimeout:a=lt,isDisabled:o}){let s=ot(()=>t,a,[t]),[c,l]=p(``),u=t&&s,d=e(n);return{...r(async()=>{if(!u||o)return l(``),Promise.resolve(i);let e=await d(u);return l(u),e},[u,i,d,o],i),currentResultsQuery:c}}var pt={root:`JaXKxj2K`,arrow:`_-7ow-ETi`},mt=4*u,ht=m(({fromPeer:e,toPeer:n,avatarSize:r=mt})=>k(`div`,{className:pt.root,children:[t(O,{peer:e,size:r}),t(T,{name:`next`,className:pt.arrow}),t(O,{peer:n,size:r})]}));export{it as a,et as c,Re as d,xe as f,at as i,Qe as l,dt as n,rt as o,ft as r,nt as s,ht as t,Xe as u};
//# sourceMappingURL=TransferBetweenPeers-dJDmPZ9t.js.map
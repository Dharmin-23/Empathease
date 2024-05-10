"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6883],{3831:function(e,t,i){i.d(t,{Z:function(){return o}});var n=i(19841),r=i(35250);function o(e){let{percentage:t,thickness:i=1/12,className:o,backgroundStrokeClassName:a="stroke-gray-400",transitionDuration:l,transitionTimingFunction:s,onTransitionEnd:d}=e,c=120*i,u=(120-c)/2,f=2*Math.PI*u;return(0,r.jsxs)("svg",{width:120,height:120,viewBox:"0 0 ".concat(120," ").concat(120),className:o,children:[(0,r.jsx)("circle",{className:(0,n.default)("origin-[50%_50%] -rotate-90",a),strokeWidth:c,fill:"transparent",r:u,cx:60,cy:60}),(0,r.jsx)("circle",{className:"origin-[50%_50%] -rotate-90 transition-[stroke-dashoffset]",stroke:"currentColor",strokeWidth:c,strokeDashoffset:f-t/100*f,strokeDasharray:"".concat(f," ").concat(f),fill:"transparent",r:u,cx:60,cy:60,style:{transitionDuration:l,transitionTimingFunction:s},onTransitionEnd:d})]})}},47414:function(e,t,i){i.d(t,{$e:function(){return o},EZ:function(){return a},Ql:function(){return r},dO:function(){return n},xC:function(){return l}});let n=10,r=4,o={duration:20,hasCloseButton:!0},a=512,l=536870912},96417:function(e,t,i){i.d(t,{R3:function(){return w},W7:function(){return m},cT:function(){return v},lU:function(){return y},po:function(){return g}});var n=i(61939),r=i(44506),o=i(59449),a=i(29057),l=i(21218),s=i(68498),d=i(23173),c=i(28592),u=i(64551),f=i(73433);let p={duration:20,hasCloseButton:!0};function m(e){return JSON.stringify({file:e.name,modified:e.lastModified,currentTime:new Date().toString()})}function g(e){return new Promise((t,i)=>{let n=new FileReader,r=new Image;n.onload=()=>{r.onload=()=>t(r),r.onerror=e=>i(e),r.src=n.result},n.readAsDataURL(e)})}async function v(e,t,i,s,u,f){var m,g,v;let w=d.N.getState().resetRateLimits,y=n.EG.Initial;a.A.logEvent(l.M.uploadFileInitiated,{client:"web",useCase:s.kind});let I=f.usesRetrievalIndex?performance.now():void 0;try{let{file_id:o,upload_url:a}=await r.Z.createFile(t.name,t.size,s,!!w);u.onFileCreated(e,o,a),y=n.EG.FileCreated;let l=s.kind===n.Ei.Gizmo?s.gizmoId:void 0,d=null!==(m=f.shouldUpdateProgress)&&void 0!==m&&m,v=null!==(g=f.usesRetrievalIndex)&&void 0!==g&&g,E=await r.Z.uploadFileToAzureStorage(t,a,t=>{d&&u.onFileUploadProgress(e,10+80*t)});if(u.onFileUploadProgress(e,90),201!==E.status&&h(E,o,v),y=n.EG.FileUploaded,await r.Z.processFileUpload(o,{gizmoId:l}),y=n.EG.FileProcessed,f.usesRetrievalIndex){let t=await F(o,l);(null==t?void 0:t.status)===n.Xf.Skipped&&c.m.danger(i.formatMessage(k.retrievalSkippedFile,{fileName:t.name}),p),u.onFileUploaded(e,o,void 0,{fileTokenSize:t.file_size_tokens}),y=n.EG.RetrievalIndexCreated}else u.onFileUploaded(e,o,f.imageDimensions);null!=I&&r.Z.postRetrievalTiming({e2eLatencyMs:performance.now()-I})}catch(r){E(i,t.name,r);let n="NotInstanceOfError";r instanceof o.gK?n=r.name:r instanceof o.Q0?n="FatalServerError_type_".concat(null!==(v=r.type)&&void 0!==v?v:"undefined"):r instanceof Error?n=r.name:r instanceof o.vq&&(n=r.name),u.onError(e,"error",n,s,y)}}async function w(e,t,i,a,l){let s=n.EG.Initial;try{let d=await r.Z.uploadConnectorAPI(e,a.contextConnector,i,t,void 0,a.o365DriveId);switch(d.type){case"error":throw function(e){let{status_code:t,error_code:i,error_message:n}=e;if(!t||!(t<500))return new o.Q0(n);{let e="internal_error";return i?e=i:404===t?e="file_not_found":403===t?e="permission_error":413===t&&(e="file_too_large"),new o.vq(n,e)}}(d.error);case"file":switch(u.MP.onFileCreated(e,d.file.id,""),s=n.EG.FileProcessed,i.kind){case n.Ei.MyFiles:{u.MP.onFileUploadProgress(e,90);let t=await F(d.file.file_id);(null==t?void 0:t.status)===n.Xf.Skipped&&c.m.danger(l.formatMessage(k.retrievalSkippedFile,{fileName:t.name}),p),u.MP.onFileUploaded(e,d.file.file_id,void 0,{fileTokenSize:t.file_size_tokens,mimeType:d.file.mime_type}),s=n.EG.RetrievalIndexCreated;break}case n.Ei.Multimodal:u.MP.onFileUploaded(e,d.file.file_id,{width:512,height:512},{mimeType:d.file.mime_type});break;case n.Ei.AceUpload:u.MP.onFileUploaded(e,d.file.file_id,void 0,{mimeType:d.file.mime_type});break;case n.Ei.DalleAgent:case n.Ei.Gizmo:case n.Ei.ProfilePicture:throw new o.vq("Use case not supported by cloud doc: ".concat(i.kind))}break;case"folder":throw new o.vq("Folder type not supported")}}catch(r){E(l,(0,f.Ad)(t.name,null==a?void 0:a.syntheticExtension),r);let i="NotInstanceOfError";if(r instanceof o.Q0){var d;i="FatalServerError_type_".concat(null!==(d=r.type)&&void 0!==d?d:"undefined")}else(r instanceof o.gK||r instanceof Error||r instanceof o.vq)&&(i=r.name);u.MP.onError(e,"error",i,{kind:n.Ei.MyFiles},s)}}async function y(e,t,i,n,r){let{width:o,height:a}=await g(t);return v(e,t,i,{kind:n},r,{imageDimensions:{width:o,height:a}})}async function F(e,t){let i=Date.now()+6e4,a=e=>new Promise(t=>setTimeout(t,e)),l=0;for(;Date.now()<i;){let i=await r.Z.getRetrievalStatus(e,t);if(i.status===n.Xf.Success||i.status===n.Xf.Skipped)return i;if(i.status===n.Xf.Failed)throw new o.vq("Context extraction failed",i.error_code);l++,await a(Math.min(1e3,100*l))}throw new o.vq("Retrieval indexing timed out")}async function h(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n="Unknown error";try{n=await e.data}catch(e){}throw i&&r.Z.markFileUploadFailed(t,{error:n}),new o.vq("File upload to blobstore failed","failed_upload_to_blobstore")}function E(e,t,i){let n=(0,f.kr)(e,"default_upload_error",{fileName:t});i instanceof o.vq&&null!=i.code&&(n=(0,f.kr)(e,i.code)),c.m.danger(n,p)}let k=(0,s.vU)({retrievalSkippedFile:{id:"useFilePickerState.retrievalSkippedFile",defaultMessage:'Unable to extract text from "{fileName}"'}})},64551:function(e,t,i){i.d(t,{Dw:function(){return h},HR:function(){return F},MP:function(){return E},gF:function(){return y}});var n=i(39993),r=i(61939),o=i(29057),a=i(21218),l=i(58236),s=i(68498),d=i(78103),c=i(28592),u=i(47414),f=i(63021),p=i(96417),m=i(73433);function g(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)}return i}function v(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?g(Object(i),!0).forEach(function(t){(0,n.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):g(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}let w={files:[],connectorFileData:{}},y=(0,d.ZP)(()=>w),F={hasUploadInProgress:e=>{let{files:t}=e;return t.some(e=>e.status===f.XX.Uploading)},getReadyFiles:e=>{let{files:t}=e;return t.filter(e=>e.status===f.XX.Ready)}},h={reset:()=>{y.setState(w)},uploadFile:async function(e,t,i,n,s){let d=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},g=arguments.length>6?arguments[6]:void 0,v=arguments.length>7?arguments[7]:void 0,{gizmoId:w}=d,F=y.getState().files,h=(0,m.xs)(i,t.name,t.type,null==v?void 0:v.contextConnector,g),I={tempId:e,gizmoId:d.gizmoId,status:f.XX.Uploading,file:t,progress:1,fileId:null,cdnUrl:null,contextConnectorInfo:v};if(F.length===u.dO)o.A.logEvent(a.M.uploadedMaxFilesError),c.m.danger(s.formatMessage(k.maxUploadsAtATime,{maxUploads:u.dO,fileName:t.name}),u.$e);else{let i;y.setState(e=>{let{files:t}=e;return{files:[...t,I]}});let o={};if(n.includes(t.type)){if(i={kind:r.Ei.Multimodal},!v){let{width:e,height:i}=await (0,p.po)(t);if(e>2048||i>2048)try{let n=await (0,m.Tu)(t,2048),r=await (0,p.po)(n);e=r.width,i=r.height,t=n}catch(e){l.U.addError(Error("Error resizing image:",{cause:e}))}o.imageDimensions={width:e,height:i}}}else switch(h){case f.AJ.Multimodal:throw Error("Multimodal file upload not supported mime type, ".concat(t.type,"\nSupported mime types: ")+n.join(", "));case f.AJ.Interpreter:i={kind:r.Ei.AceUpload};break;case f.AJ.Retrieval:i={kind:r.Ei.MyFiles},o.usesRetrievalIndex=!0;break;case f.AJ.ProfilePicture:throw Error("cannot upload profile picture via uploadFile");case f.AJ.ContextConnector:case f.AJ.None:return}null!=w&&(i={kind:r.Ei.Gizmo,gizmoId:w}),d.skipUpload||(v?await (0,p.R3)(e,t,i,v,s):await (0,p.cT)(e,t,s,i,E,o))}},createFileCompleted:(e,t,i)=>{let n=y.getState().files,r=n.findIndex(t=>t.tempId===e),o=n[r];if(r>=0&&o.status===f.XX.Uploading){let e=[...n];e.splice(r,1,v(v({},o),{},{progress:10,fileId:t,cdnUrl:i})),y.setState({files:e})}},updateProgress:(e,t)=>{let i=y.getState().files,n=i.findIndex(t=>t.tempId===e),r=i[n];if(n>=0&&r.status===f.XX.Uploading){let e=[...i];e.splice(n,1,v(v({},r),{},{progress:t})),y.setState({files:e})}},uploadCompleted:(e,t,i,n,r)=>{let l=y.getState().files,s=l.findIndex(t=>t.tempId===e);if(s>=0&&l[s].status===f.XX.Uploading&&null!==l[s].fileId){var d,c;let t=l[s],u=[...l],p=v(v({},t),{},{tempId:e,status:f.XX.Ready,progress:100,fileSpec:v(v({name:t.file.name,id:t.fileId,size:t.file.size,contextConnectorInfo:t.contextConnectorInfo,mimeType:null!==(d=null!==(c=null==n?void 0:n.mimeType)&&void 0!==c?c:t.file.type)&&void 0!==d?d:(0,m.s1)(t.file.name)},i||{}),n||{})});u.splice(s,1,p);let g=v({},y.getState().connectorFileData);r&&(g[null==r?void 0:r.file_id]=r),y.setState({files:u,connectorFileData:g}),o.A.logEvent(a.M.uploadFileCompleted,{status:t.status,fileId:t.fileId})}},remove:(e,t,i,n,r)=>{let l=y.getState().files,s=l.findIndex(t=>t.tempId===e);if(s>=0){let e=l[s];"error"===t?o.A.logEvent(a.M.uploadFileError,{status:e.status,fileId:e.fileId,client:"web",errorClassName:null!=i?i:"undefined",useCaseType:n,uploadStatus:null!=r?r:"undefined"}):o.A.logEvent(a.M.removeFile,{status:e.status,fileId:e.fileId});let d=[...l];d.splice(s,1),y.setState({files:d})}}},E={onFileCreated:h.createFileCompleted,onFileUploadProgress:h.updateProgress,onFileUploaded:h.uploadCompleted,onError:h.remove},k=(0,s.vU)({maxUploadsAtATime:{id:"useFilePickerState.maxUploadsAtATime",defaultMessage:"Unable to upload {fileName}. Max {maxUploads} uploads at a time"}})},23173:function(e,t,i){i.d(t,{J:function(){return r},N:function(){return o}});var n=i(78103);let r={label:"Auto",value:""},o=(0,n.ZP)(()=>({forceParagen:!1,forceNulligen:!1,forceParagenModel:r,forceRateLimit:!1,resetRateLimits:!1,showDebugConversationTurns:!1,rebaseSystemMessageContent:null}))}}]);
//# sourceMappingURL=6883-cfbe24a751937e6d.js.map
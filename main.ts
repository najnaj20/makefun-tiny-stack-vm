import{readdirSync as R,readFileSync as F,mkdirSync as M,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',E='01146abf0000000099999995999599909990000000000000044000000000000058000000000000004414';
for(let d of R(I).sort()){
let p=F(I+'/'+d+'/program.bin'),g=F(I+'/'+d+'/input.bin'),n=p.length,D=[],K=[],m=new Int32Array(256),o=new Uint8Array(65536),l=0,s=0,c=0,x=0,t=0,j=0,e=0;
L:for(;;){
if(t==1e6){e=10;break L}
if(x<0||x>=n){e=9;break L}
let v=p[x],q=+('0x'+E[v]);
if(!(v==0||v==48||v==51||v==52||q)){e=5;break L}
let y=v==1?1:v==2?4:v>47&&v<52?2:0,u=q>>2,w=q&3;
if(x+y>=n){e=9;break L}
t++;let z=x+1+y;
if(s<u||s-u+w>256){e=s<u?2:3;break L}
x=z;
if(v==0){e=0;break L}
if(v==1){D[s++]=(p[z-1]<<24)>>24;continue}
if(v==2){D[s++]=p[z-4]|p[z-3]<<8|p[z-2]<<16|p[z-1]<<24;continue}
if(v==3){s--;continue}
if(v==4){D[s]=D[s-1];s++;continue}
if(v==5){let a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;continue}
if(v==6){D[s]=D[s-2];s++;continue}
if(v==7){let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue}
if(v==23){D[s-1]=-D[s-1]|0;continue}
if(v==27){D[s-1]=~D[s-1];continue}
if(v>15&&v<35){
let b=D[s-1],a=D[s-2],r;
if(v>18&&v<23&&b==0){e=4;break L}
r=v==16?a+b|0:v==17?a-b|0:v==18?Math.imul(a,b):v==19?a/b|0:v==20?a%b|0:v==21?(a>>>0)/(b>>>0)|0:v==22?(a>>>0)%(b>>>0)|0:v==24?a&b:v==25?a|b:v==26?a^b:v==28?a<<(b&31):v==29?a>>(b&31):v==30?a>>>(b&31)|0:v==32?a==b?1:0:v==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;continue}
if(v>47&&v<51){
if(v!=48){let q=D[--s];if(v==49?q!=0:q==0)continue}
x=z+(((p[z-2]|p[z-1]<<8)<<16)>>16);continue}
if(v==51){if(c==64){e=7;break L}K[c++]=z;x=p[z-2]|p[z-1]<<8;continue}
if(v==52){if(c==0){e=8;break L}x=K[--c];continue}
if(v==64){let a=D[s-1];if(a<0||a>255){e=6;break L}D[s-1]=m[a];continue}
if(v==65){let a=D[s-1],q=D[s-2];if(a<0||a>255){e=6;break L}s-=2;m[a]=q;continue}
if(v==80){let q=''+D[s-1];if(l+q.length>65536){e=11;break L}s--;o.set(Buffer.from(q),l);l+=q.length;continue}
if(v==81){if(l+1>65536){e=11;break L}o[l++]=D[--s]&255;continue}
if(v==82){D[s++]=j<g.length?g[j++]:-1;continue}
if(v==83){e=D[--s]&255;break L}
}
M(O+'/'+d,{recursive:true});W(O+'/'+d+'/stdout.bin',o.slice(0,l));W(O+'/'+d+'/exit.txt',e+'\n');
}

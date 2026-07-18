import { chromium } from 'playwright'
const B='http://localhost:8899/_preview'
const pages=['index','talent-advisory','talent-search','clients','about','insights','contact']
const b=await chromium.launch()
const ctx=await b.newContext({viewport:{width:1440,height:900}, reducedMotion:'reduce'})
const p=await ctx.newPage()
const allErr=[]
for(const pg of pages){
  const errs=[]
  p.removeAllListeners('pageerror'); p.removeAllListeners('console')
  p.on('pageerror',e=>errs.push('ERR '+e.message))
  p.on('console',m=>{if(m.type()==='error')errs.push('CON '+m.text())})
  await p.goto(`${B}/${pg}.html`,{waitUntil:'load'})
  await p.waitForTimeout(1200)
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)
    document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in'))})
  await p.waitForTimeout(400)
  const imgs=await p.evaluate(()=>({total:document.images.length,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length}))
  await p.screenshot({path:`shots/wp-${pg}.png`, fullPage: pg==='contact'})
  console.log(pg.padEnd(16), 'imgs '+imgs.total+' broken '+imgs.broken, 'errors '+errs.length, errs.slice(0,2).join(' | '))
  allErr.push(...errs)
}
await b.close()
console.log('TOTAL console errors:', allErr.length)

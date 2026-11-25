"use client";
import {useMemo, useState} from "react";
import Link from "next/link";
import styles from "./developer-bench.module.css";

export type DeveloperProfile = {profileId?:string;name?:string;role:string;experience?:string;skills?:string[];availability?:string;engagement?:string;bio?:string};
const sampleProfiles:DeveloperProfile[]=[
 {profileId:"KR-1042",role:"Senior Full Stack Developer",experience:"Senior",skills:["React","Node.js","AWS","MongoDB"],availability:"Confirm with our team",engagement:"Short-term or long-term"},
 {profileId:"KR-1043",role:"React Frontend Developer",experience:"Senior",skills:["React","TypeScript","Redux","Tailwind"],availability:"Confirm with our team",engagement:"Short-term or long-term"},
 {profileId:"KR-1044",role:"Node.js Backend Developer",experience:"Senior",skills:["Node.js","Express","PostgreSQL","Docker"],availability:"Confirm with our team",engagement:"Long-term"},
 {profileId:"KR-1045",role:"Full Stack Developer",experience:"Senior",skills:["Angular","Node.js","AWS","PostgreSQL"],availability:"Confirm with our team",engagement:"Short-term or long-term"},
 {profileId:"KR-1046",role:"DevOps Engineer",experience:"Mid-level",skills:["AWS","Docker","Kubernetes","Terraform"],availability:"Confirm with our team",engagement:"Long-term"},
 {profileId:"KR-1047",role:"Mobile Developer",experience:"Mid-level",skills:["Mobile","React Native","iOS","Android"],availability:"Confirm with our team",engagement:"Short-term or long-term"},
 {profileId:"KR-1048",role:"UI/UX Engineer",experience:"Senior",skills:["Figma","React","Design Systems","Accessibility"],availability:"Confirm with our team",engagement:"Short-term"},
 {profileId:"KR-1049",role:"Python Backend Developer",experience:"Senior",skills:["Python","Django","PostgreSQL","AWS"],availability:"Confirm with our team",engagement:"Long-term"},
 {profileId:"KR-1050",role:"Cloud Architect",experience:"Lead",skills:["AWS","Azure","Terraform","Kubernetes"],availability:"Confirm with our team",engagement:"Long-term"},
 {profileId:"KR-1051",role:"AI Agent Engineer",experience:"Senior",skills:["Agentic AI","AI / ML","Python","LangChain"],availability:"Confirm with our team",engagement:"Short-term or long-term"},
 {profileId:"KR-1052",role:"QA Automation Engineer",experience:"Mid-level",skills:["QA","Playwright","Cypress","TypeScript"],availability:"Confirm with our team",engagement:"Short-term"},
 {profileId:"KR-1053",role:"Shopify Commerce Developer",experience:"Senior",skills:["eCommerce","Shopify","Liquid","React"],availability:"Confirm with our team",engagement:"Long-term"},
];
const skills=["eCommerce","DevOps","Agentic AI","QA","Mobile","AI / ML","React","Node.js","Angular","AWS","TypeScript"];
const benefits=[
 {number:"01",title:"Relevant experience",text:"Find engineers with skills aligned to your product, platform, and delivery goals."},
 {number:"02",title:"A considered shortlist",text:"Share the role and must-have skills. We will help narrow the search to suitable profiles."},
 {number:"03",title:"Flexible engagement",text:"Shape a team around the work, with engagement options that fit your timeline."},
 {number:"04",title:"A clear start",text:"Discuss onboarding, communication, and working practices before the engagement begins."},
];
function SelectField({label,value,values,onChange}:{label:string;value:string;values:string[];onChange:(value:string)=>void}) {
 return <label className={styles.filterField}><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)} aria-label={label}>{values.map(option=><option key={option}>{option}</option>)}</select></label>;
}
export default function DeveloperBench({developers}:{developers:DeveloperProfile[]}) {
 const profiles=developers.length?developers:sampleProfiles;
 const [skill,setSkill]=useState("All skills"),[level,setLevel]=useState("All levels"),[availability,setAvailability]=useState("Any availability"),[engagement,setEngagement]=useState("Any engagement"),[page,setPage]=useState(1),[expanded,setExpanded]=useState<string|null>(null);
 const pageSize=9;
 const filtered=useMemo(()=>profiles.filter(p=>(skill==="All skills"||p.skills?.some(s=>s.toLowerCase()===skill.toLowerCase()))&&(level==="All levels"||p.experience?.toLowerCase().includes(level.toLowerCase()))&&(availability==="Any availability"||p.availability?.toLowerCase().includes(availability.toLowerCase()))&&(engagement==="Any engagement"||p.engagement?.toLowerCase().includes(engagement.toLowerCase()))),[profiles,skill,level,availability,engagement]);
 const totalPages=Math.max(1,Math.ceil(filtered.length/pageSize)),visible=filtered.slice((page-1)*pageSize,page*pageSize);
 const reset=()=>{setSkill("All skills");setLevel("All levels");setAvailability("Any availability");setEngagement("Any engagement");setPage(1);};
 return <main id="main" className={styles.page}>
  <section className={styles.hero}><div className={styles.heroGlow} aria-hidden="true"/><div className={styles.heroInner}>
   <div className={styles.heroCopy}><span className={styles.eyebrow}><i/> HIRE DEVELOPERS</span><h1>Find your next<br/><em>great developer.</em></h1><p>Explore engineering talent across product development, AI, cloud, mobile, and commerce. Tell us what you are building and we will help you find the right fit.</p>
    <div className={styles.heroActions}><Link href="/contact?intent=hire-developers" className={styles.primaryButton}>Share your requirement <span>↗</span></Link><a href="#developer-list" className={styles.textLink}>Explore developer profiles <span>↓</span></a></div>
    <div className={styles.heroMeta}><span><b>01</b> Tell us what you need</span><span><b>02</b> Review a shortlist</span><span><b>03</b> Build together</span></div>
   </div>
   <div className={styles.heroVisual} aria-label="A preview of a developer profile"><div className={styles.orbit+" "+styles.orbitOne}/><div className={styles.orbit+" "+styles.orbitTwo}/>
    <div className={styles.profilePreview}><div className={styles.previewTop}><span className={styles.onlineDot}/> DEVELOPER PROFILE <span>KR—01</span></div><div className={styles.previewIdentity}><div className={styles.avatar}>K<span>+</span></div><div><strong>Product engineer</strong><small>Building for what comes next</small></div></div><div className={styles.previewLine}/><div className={styles.previewSkills}><span>CORE SKILLS</span><div>{["React","AI / ML","Cloud","Product"].map(tag=><b key={tag}>{tag}</b>)}</div></div><div className={styles.previewFooter}><span>Matched to your goals</span><i>↗</i></div></div>
    <div className={styles.floatTag}><span>✳</span> Flexible teams</div><div className={styles.floatCode}>{"{ build: \"together\" }"}</div>
   </div>
  </div><div className={styles.heroBottom}><span>ENGINEERING TALENT, MATCHED TO THE WORK</span><span className={styles.scrollMark}>SCROLL TO EXPLORE <b>↓</b></span></div></section>
  <section className={styles.directory} id="developer-list">
   <div className={styles.sectionIntro}><div><span className={styles.sectionEyebrow}>THE DEVELOPER BENCH</span><h2>Find the right skills<br/><em>for the work ahead.</em></h2></div><p>Browse by stack and experience, then share a profile with your team. Need a specific combination? Send us your brief and we will help you shape a shortlist.</p></div>
   <div className={styles.filterBar}><SelectField label="Skill / stack" value={skill} values={["All skills",...skills]} onChange={v=>{setSkill(v);setPage(1)}}/><SelectField label="Experience level" value={level} values={["All levels","Junior","Mid-level","Senior","Lead"]} onChange={v=>{setLevel(v);setPage(1)}}/><SelectField label="Availability" value={availability} values={["Any availability",...Array.from(new Set(profiles.map(p=>p.availability).filter((v):v is string=>Boolean(v))))]} onChange={v=>{setAvailability(v);setPage(1)}}/><SelectField label="Engagement" value={engagement} values={["Any engagement",...Array.from(new Set(profiles.flatMap(p=>(p.engagement||"").split(/\s+or\s+/i)).filter(Boolean)))]} onChange={v=>{setEngagement(v);setPage(1)}}/><button type="button" className={styles.resetButton} onClick={reset}>Reset filters <span>↺</span></button></div>
   <div className={styles.resultsLabel}><span>{filtered.length} {filtered.length===1?"role":"roles"} to explore</span><span>PROFILE DETAILS CONFIRMED DURING ENQUIRY</span></div>
   {!developers.length&&<p className={styles.sampleNotice}>Sample role profiles for the local preview. Add published Kodrise developer profiles in the dashboard to replace these examples.</p>}
   {visible.length?<div className={styles.grid}>{visible.map((profile,index)=>{const id=profile.profileId||"KR-"+(index+1),isOpen=expanded===id;return <article className={styles.card} key={id} style={{"--card-index":index} as React.CSSProperties}>
    <div className={styles.cardTop}><span className={styles.roleLabel}>ROLE PROFILE</span><span className={styles.profileId}>{id}</span></div>
    <div className={styles.cardTitle}><div className={styles.cardGlyph} aria-hidden="true"><span>{profile.role.split(/\s+/).map(word=>word[0]).slice(0,2).join("").toUpperCase()}</span></div><div><h3>{profile.name||profile.role}</h3><p>{profile.name?profile.role:"Developer profile"}</p></div></div>
    <div className={styles.experience}>{profile.experience||"Experience matched to your brief"}</div>
    <div className={styles.skillBlock}><span>CORE SKILLS</span><div>{(profile.skills||[]).slice(0,4).map(item=><b key={item}>{item}</b>)}</div></div>
    <div className={styles.cardFacts}><div><span>AVAILABILITY</span><strong>{profile.availability||"Confirm with our team"}</strong></div><div><span>ENGAGEMENT</span><strong>{profile.engagement||"Flexible options"}</strong></div></div>
    {isOpen&&<p className={styles.bio}>{profile.bio||"A "+profile.role.toLowerCase()+" profile with experience across "+(profile.skills||[]).slice(0,3).join(", ")+". Contact our team to confirm fit, availability, and engagement details."}</p>}
    <div className={styles.cardActions}><button type="button" className={styles.viewButton} onClick={()=>setExpanded(isOpen?null:id)}>{isOpen?"Hide details":"View profile"}<span>{isOpen?"−":"↗"}</span></button><Link className={styles.requestButton} href={"/contact?intent=hire-developers&role="+encodeURIComponent(profile.role)}>Request this role <span>→</span></Link></div>
   </article>})}</div>:<div className={styles.noResults}><span>⌕</span><h3>No roles match those filters.</h3><p>Try a broader combination, or tell us about the skills you need.</p><button type="button" onClick={reset}>Clear filters</button></div>}
   {totalPages>1&&<nav className={styles.pagination} aria-label="Developer profile pages"><button disabled={page===1} onClick={()=>setPage(page-1)} aria-label="Previous page">←</button>{Array.from({length:totalPages},(_,i)=><button key={i} className={page===i+1?styles.currentPage:""} onClick={()=>setPage(i+1)} aria-current={page===i+1?"page":undefined}>{i+1}</button>)}<button disabled={page===totalPages} onClick={()=>setPage(page+1)} aria-label="Next page">→</button></nav>}
  </section>
  <section className={styles.shortlist}><div className={styles.shortlistMark} aria-hidden="true">✳</div><div className={styles.shortlistCopy}><span className={styles.sectionEyebrow}>YOUR TEAM, YOUR WAY</span><h2>Looking for a specific<br/><em>combination of skills?</em></h2><p>Tell us about the role, technologies, and timeline. Our team can help you explore suitable profiles and next steps.</p><Link href="/contact?intent=hire-developers" className={styles.primaryButton}>Send your hiring brief <span>↗</span></Link></div><div className={styles.shortlistAside}><span>START WITH</span>{["The role and responsibilities","Must-have technologies","Timeline and team setup"].map((item,i)=><div key={item}><b>0{i+1}</b>{item}<i>↗</i></div>)}</div></section>
  <section className={styles.benefitSection}><div className={styles.benefitHeading}><span className={styles.sectionEyebrow}>A THOUGHTFUL HIRING PROCESS</span><h2>Good teams start with<br/><em>the right conversation.</em></h2></div><div className={styles.benefitGrid}>{benefits.map(item=><article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><i>↗</i></article>)}</div></section>
 </main>;
}

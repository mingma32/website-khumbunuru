'use client';
import {useState} from 'react';
import {posts,categories} from '@/lib/content';
import {BlogCard} from './Site';
export default function BlogList(){const [category,setCategory]=useState('All');const filtered=posts.filter(p=>category==='All'||p.category===category);return <><div className="filters" aria-label="Blog categories">{['All',...categories].map(c=><button key={c} className={category===c?'selected':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><p className="sample-note">Sample articles · Practical ideas for your next technology decision.</p><div className="blog-grid">{filtered.map(p=><BlogCard post={p} key={p.slug}/>)}</div></>}

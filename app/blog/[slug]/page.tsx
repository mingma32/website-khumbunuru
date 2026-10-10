import {posts} from '@/lib/content';

import {notFound} from 'next/navigation';
import {CTA} from '@/components/Site';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=posts.find(x=>x.slug===slug);return {title:p?.title??'Article not found',description:p?.excerpt};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=posts.find(x=>x.slug===slug);if(!p)notFound();return <><article className="container article"><a href="/blog" className="text-link">Back to all insights</a><p className="eyebrow">{p.category} · SAMPLE ARTICLE · {p.read} READ</p><h1>{p.title}</h1><p className="lead">{p.excerpt}</p><div className="article-body">{p.paragraphs.map(t=><p key={t}>{t}</p>)}</div></article><CTA/></>}

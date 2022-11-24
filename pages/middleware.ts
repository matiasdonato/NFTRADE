import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const flag = await prisma
  return NextResponse.redirect(new URL('/about-2', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '',
}

// const array = ["https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705302.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705320.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705323.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705326.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705332.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748160.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748166.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748169.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748172.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748175.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748178.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748184.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748187.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Monkey-001.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Monkey-27-1.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Screenshot-12-1.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/TheDeaf.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/aprint.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/clow.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/daaf-2.jpeg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/giphy.gif", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611033.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611042.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611054.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149622012.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149622015.jpg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/images.jpeg", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/nft.gif", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/pizzaaa.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/psyco.png", "https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/withhat.png" ]

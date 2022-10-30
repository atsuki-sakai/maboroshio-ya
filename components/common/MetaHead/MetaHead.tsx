import React, { ReactNode } from 'react'
import Head from 'next/head'

interface Props {
    title?: string
    description?: string
    ogImgPath?: string
    url?: string
    type?: string
    siteName?: string
}

const MetaHead = ({
                    title = "丹波篠山物産展 | 丹波篠山のうまいもんを届ける通販サイト",
                    description = "丹波篠山物産展は特産品である黒枝豆、猪肉、松茸、山芋などの丹波篠山の特産品を全国の皆様にお気軽に楽しんでいただける様に開店した通販サイトです。",
                    ogImgPath = "https://maboroshio-ya.vercel.app/images/test-og-image.png",
                    url = "https://maboroshio-ya.vercel.app",
                    type = "website",
                    siteName = "丹波篠山物産展 | 丹波篠山のうまいもんを届ける通販サイト",
                }: Props) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="shortcut icon" href={`https://maboroshio-ya.vercel.app/favicon.ico`}/>
            <link rel="canonical" href={url}></link>
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={ogImgPath} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="ja_JP" />
            <meta property="og:description" content={description} />
            <meta name='twitter:site' content="@rKW0OxHzlwaTp3U" />
            <meta name="twitter:card" content="summary" />
            <meta name='twitter:domain' content="maboroshio-ya.vercel.app" />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={ogImgPath} />
            <meta property="fb:app_id" content="1159267118350717" />
        </Head>
    )
}

export default MetaHead
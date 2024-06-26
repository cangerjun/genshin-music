import {DefaultPage} from "$cmp/shared/pagesLayout/DefaultPage";
import {APP_NAME} from "$config";
import {BlogMetadata} from "$cmp/pages/blog/types";
import {Card} from "$cmp/shared/layout/Card";
import Link from "next/link";
import {_midiDeviceMetadata} from "$pages/blog/posts/connect-midi-device";
import {Header} from "$cmp/shared/header/Header";
import {Grid} from "$cmp/shared/layout/Grid";
import {Column} from "$cmp/shared/layout/Column";
import s from './blog.module.scss'
import {_aiTransposeMetadata} from "$pages/blog/posts/video-audio-transpose";
import {_midiTransposeMetadata} from "$pages/blog/posts/midi-transpose";
import {_playerTutorialMetadata} from "$pages/blog/posts/how-to-use-player";
import {_composerTutorialMetadata} from "$pages/blog/posts/how-to-use-composer";
import {PageMetadata} from "$cmp/shared/Miscellaneous/PageMetadata";
import {Row} from "$cmp/shared/layout/Row";
import {useMemo, useState} from "react";
import {BlogNavbar, useHasVisitedBlogPost} from "$cmp/pages/blog/BaseBlogPost";
import {BlogAuthorRenderer, BlogTagsRenderer} from "$cmp/pages/blog/BlogMetadataRenderers";
import {ComboBox, ComboBoxItem, ComboBoxTitle} from "$cmp/shared/Inputs/ComboBox/ComboBox";
import {_howUseVsrgComposer} from "$pages/blog/posts/how-to-use-vsrg-composer";
import {_easyplay1sMetadata} from "$pages/blog/posts/easyplay-1s";
import {PromotionCard} from "$cmp/pages/Promotion/PromotionCard";
import {useSetPageVisited} from "$cmp/shared/PageVisit/pageVisit";
import {_add_to_home_screen} from "$pages/blog/posts/add-to-home-screen";
import {useMediaQuery} from "$lib/Hooks/useMediaQuery";
import {useConfig} from "$lib/Hooks/useConfig";

const posts = ([
    _add_to_home_screen,
    _easyplay1sMetadata,
    _composerTutorialMetadata,
    _playerTutorialMetadata,
    _midiTransposeMetadata,
    _midiDeviceMetadata,
    _aiTransposeMetadata,
    _howUseVsrgComposer
] satisfies BlogMetadata[]).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

const tags = Array.from(new Set(posts.flatMap(p => p.tags)).values())


export default function Blog() {
    useSetPageVisited('blog')
    const {IS_MOBILE} = useConfig()
    const [selectedTags, setSelectedTags] = useState(() => tags.map(i => ({item: i, selected: false})))
    const filteredPosts = useMemo(() => {
        if (selectedTags.every(t => !t.selected)) return posts
        return posts.filter(p => selectedTags.some(t => t.selected && p.tags.includes(t.item)))
    }, [selectedTags])
    const closeMenu = useMediaQuery("(orientation: portrait)") && IS_MOBILE
    return <DefaultPage excludeMenu={closeMenu} contentStyle={{gap: '1rem'}}>
        <PageMetadata
            text={`${APP_NAME} Music Nightly Blog`}
            description={`Welcome to ${APP_NAME} Music Nightly blog! Here there will be written guides, news and info about the app!`}
        />
        {closeMenu && <BlogNavbar
            style={{borderRadius: "0.5rem", padding: '1rem 1.5rem'}}
        >
            <Link href={'/'}>
                Home
            </Link>
            <Link href={'/'}>
                Player
            </Link>
            <Link href={'/composer'}>
                Composer
            </Link>
        </BlogNavbar>
        }
        <Column gap={'2rem'}>
            <Header style={{fontSize: '2.2rem', textAlign: 'center'}}>
                Welcome to {APP_NAME} Music Nightly blog!
            </Header>
            <PromotionCard alwaysVisible/>
            <Column gap={'1rem'}>
                <Row justify={'between'} align={'center'}>
                    <Header>
                        Posts
                    </Header>
                    <ComboBox
                        items={selectedTags}
                        title={<ComboBoxTitle>Select tags</ComboBoxTitle>}
                        onChange={setSelectedTags}
                        style={{zIndex: 3}}
                    >
                        {(item, onClick) =>
                            <ComboBoxItem key={item.item} item={item} onClick={onClick}>
                                {item.item}
                            </ComboBoxItem>
                        }
                    </ComboBox>
                </Row>

                <Grid
                    columns={closeMenu ? '1fr' : 'repeat(2, 1fr)'}
                    gap={'1rem'}
                >
                    {filteredPosts.map((metadata) =>
                        <BlogPost key={metadata.relativeUrl} metadata={metadata}/>
                    )}
                </Grid>
            </Column>
        </Column>
    </DefaultPage>
}


interface BlogPostProps {
    metadata: BlogMetadata
}

function BlogPost({metadata}: BlogPostProps) {
    const visited = useHasVisitedBlogPost(metadata.relativeUrl)
    const date = useMemo(() => {
        return new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale).format(metadata.createdAt)
    }, [metadata.createdAt])
    return <Link
        href={`/blog/posts/${metadata.relativeUrl}`}
    >
        <Card
            className={`${s['blog-card']} ${!visited ? s['blog-card-new'] : ""}`}
            style={{height: '100%'}}
        >
            <Header type={'h2'} className={`${s['blog-card-title']}`} style={{marginBottom: '-1.5rem'}}>

                <div
                    className={`${s['blog-card-image']}`}
                    style={{backgroundImage: `url(${metadata.image})`}}
                >
                </div>
                <div className={`${s['blog-card-title-content']}`}>
                    {metadata.title}
                </div>
                {metadata.author &&
                    <div
                        style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem'
                        }}
                    >
                        <BlogAuthorRenderer author={metadata.author} size={'2rem'} noName/>
                    </div>
                }
            </Header>
            <Column
                padding={'1rem'}
                style={{paddingTop: '0.5rem'}}
                className={`${s['blog-card-description']}`}
            >
                {metadata.description}
            </Column>
            <Row justify={'between'} align={'end'} style={{padding: '0.5rem'}} flex1>
                <Row style={{fontSize: '0.8rem'}}>
                    <BlogTagsRenderer
                        tags={metadata.tags}
                    />
                </Row>

                <div suppressHydrationWarning={true}>
                    {date}
                </div>
            </Row>
        </Card>

    </Link>
}


import {DefaultPage} from '$cmp/shared/pagesLayout/DefaultPage'
import {PageMetadata} from '$cmp/shared/Miscellaneous/PageMetadata'
import {useSetPageVisited} from "$cmp/shared/PageVisit/pageVisit";

export default function Privacy() {
    useSetPageVisited('privacy')
    return <DefaultPage>
        <PageMetadata text="Privacy" description='Privacy policy for the app'/>
        <span>
            This website uses cookies to collect data about usage of the app through IP anonymized Google Analytics.
            We use this information to improve user experience and find how our users use the app.
            All data (songs, themes, folders, etc) produced by you is stored in the browser.

            If you wish to see how Google Analytics collects data, please visit
            <a
                href='https://support.google.com/analytics/answer/11593727'
                target='_blank'
                rel="noreferrer"
                style={{color: 'var(--primary-text)', textDecoration: "underline", marginLeft: '0.3rem'}}
            >
                here.
            </a>

        </span>
    </DefaultPage>
}
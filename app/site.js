var Cal = {};

(function (ns, html, cms) {
    /**
     * data structure to efficiently represent a set of pages with repeated content
     */
    function Site() {
        var me = this,
            pages = [],
            activePage = null;

        me.addPage = addPage;
        me.renderNav = renderNav;
        me.renderPage = renderPage;

        // add page cms keys to this Site's page collection
        function addPage(title, header, footer, body, ad) {
            pages.push({
                title: cms.add(title),
                header: cms.add(header),
                footer: cms.add(footer),
                body: cms.add(body),
                ad: cms.add(ad)
            });
        }

        // render content for given page and region, unless same content already displayed 
        function renderRegion(page, region, tag) {
            var regionKey = page ? page[region] : 0,
                activeKey = activePage ? activePage[region] : 0;

            if(regionKey !== activeKey) {
                html.replace(tag, cms.get(regionKey));
            }
        }

        // render page elements, if necessary, for given page index
        function renderPage(index) {
            var page = pages[index];

            if(page) {
                renderRegion(page, 'header', '<header>');
                renderRegion(page, 'body', '<main>');
                renderRegion(page, 'footer', '<footer>');
                renderRegion(page, 'ad', '<aside>');
                activePage = page;
            }
        }

        // render nav elements
        function renderNav() {
            var nav = html.$('<nav>'),
                ul = html.$('<ul>');

            html.replace(nav).appendTo(ul, nav);

            pages.forEach(function (p, index) {
                var li = html.$('<li>'),
                    a = html.$('<a>');

                a.setAttribute('href', '#/page/' + index);
                html.appendTo(li, ul).appendTo(a, li, cms.get(p.title));
            });
        }
    }

    ns.Site = Site;
})(Cal, jQuandary, Sitenub);
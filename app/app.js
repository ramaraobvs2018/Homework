window.onload = function() {
    var mySite = new Cal.Site(),
        router = new Neckbone.Router();

    mySite.addPage('title1', 'headerContent1', 'footerContent1');
    mySite.addPage('title2', 'headerContent1', 'footerContent1', 'bodyContent1');
    mySite.addPage('title3', 'headerContent1', 'footerContent2', 'bodyContent2');
    mySite.addPage('title4', 'headerContent2', 'footerContent1', 'bodyContent3', 'advertisement1');

    mySite.renderNav();

    router.
        when('/page/:pageId', function(params) {
            mySite.renderPage(params);
        }).
        otherwise(function() {
            mySite.renderPage(0);
        });
}; 
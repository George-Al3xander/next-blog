/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.KINDE_SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
}
# Marwan Barbood — Phase 1

A dependency-free bilingual portfolio. Plain HTML, CSS and JavaScript; projects are fetched from the repository's `projects.json`. No database, admin panel, authentication, private repository integration, tracking, or secrets are included.

## 1. Upload to GitHub

1. Extract the download ZIP on your computer.
2. Sign in to GitHub. Click **+ → New repository**.
3. Name it **marwan-portfolio**. Choose **Public**, check **Add a README file**, then **Create repository**.
4. In the repository, choose **Add file → Upload files**.
5. Open the extracted `marwan-portfolio` folder. Drag its CONTENTS into GitHub, not the outer folder. `index.html` must appear at the repository root.
6. Enter `Add bilingual portfolio` as the commit message. Click **Commit changes**. If the uploaded README replaces the generated one, that is expected.
7. Ensure `index.html`, `styles.css`, `app.js`, `projects.json`, `favicon.svg`, `_headers`, `404.html`, and `.nojekyll` are present. Windows may hide dotfiles; if `.nojekyll` is missing, use **Add file → Create new file** and name it `.nojekyll`, add a blank line, then commit.

Do not upload passwords, tokens or private information. The published JSON is public even if the source repository is private.

## 2. Host with Cloudflare Pages (recommended)

GitHub stores the source; Cloudflare Pages hosts it. You do not need to turn on GitHub Pages for this option.

1. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** (the interface may say **Import an existing Git repository**).
2. Connect GitHub. Authorize only the `marwan-portfolio` repository when possible.
3. Select the repository and begin setup.
4. Project name: `marwan-portfolio` (choose a unique variation if taken).
5. Production branch: `main`. Framework preset: **None**.
6. Build command: `exit 0`. Build output directory: `.`. Leave root directory and environment variables empty.
7. Click **Save and Deploy**. Open the returned `pages.dev` address after deployment succeeds.
8. Check the English/Arabic switch, narrow mobile layout, and project empty state. Changing the JSON and committing to `main` will trigger another deployment.

Official guides: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ and https://developers.cloudflare.com/pages/get-started/git-integration/

## 3. Connect marwanbarbood.com

1. Open your Pages project → **Custom domains → Set up a custom domain**.
2. Enter `marwanbarbood.com` and follow Cloudflare's instructions.
3. For an apex domain, the domain must be a zone in the same Cloudflare account; add it and complete its nameserver setup if necessary.
4. Let Pages create the required DNS record. If Cloudflare reports an existing record conflict, inspect that record before replacing it, especially if the domain already hosts something.
5. Wait for domain verification and certificate activation. Then visit `https://marwanbarbood.com`.
6. Add `www.marwanbarbood.com` separately if you want it too.

Official guide: https://developers.cloudflare.com/pages/configuration/custom-domains/

## Alternative: host directly with GitHub Pages

Choose this instead of Cloudflare hosting if desired:

1. Repository → **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main`, folder **/(root)**, then **Save**.
4. Wait for the Pages deployment to complete, then open the published link from that screen.

All asset paths are relative, so this works under `https://YOUR-USERNAME.github.io/marwan-portfolio/` too. `_headers` is a Cloudflare Pages feature; GitHub Pages does not apply those security headers. Configure your custom domain through the selected host, not both hosts.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Add your real projects

The initial list is intentionally empty. No projects, contact addresses, achievements or external profile links have been invented. The biography is draft copy; edit it to match your work. Your age and personal contact details are not displayed.

On GitHub, open `projects.json` → pencil icon → edit → **Commit changes**. For example, replace its contents with the following and change the sample text and URLs to your real project:

```json
{
  "projects": [
    {
      "title": { "en": "Your project title", "ar": "اسم مشروعك" },
      "description": {
        "en": "Describe what you built, who it helps, and your contribution.",
        "ar": "اشرح ما بنيته، ومن يستفيد منه، وما دورك فيه."
      },
      "stack": ["HTML", "CSS", "JavaScript"],
      "url": "https://example.com",
      "source": "https://github.com/YOUR-USERNAME/YOUR-REPOSITORY"
    }
  ]
}
```

Delete `url` or `source` when no live demo or public source exists. Only absolute HTTPS links are rendered. Both translations are required for object-form titles and descriptions; a plain string is also supported for names shared across languages. Add more project objects separated by commas. Do not add comments or trailing commas to JSON. Display order follows the array, up to 100 projects.

The loader handles network failures, malformed data, empty lists, a 10-second timeout, and retry. Project text is rendered as plain text, never injected HTML. A saved language preference is optional and safely degrades if browser storage is disabled.

## Edit the design and copy

- `index.html`: page structure and initial English content.
- `app.js`: English and Arabic translations; update both when changing copy.
- `styles.css`: cream background, charcoal text, responsive layouts and RTL typography.
- `projects.json`: public project data.
- `_headers`: Cloudflare Pages security and JSON cache rules.

## Preview locally

Serve this folder using a static HTTP server (for example VS Code's Live Server extension), then open the displayed localhost URL. Do not double-click `index.html`: browsers restrict JSON fetching on `file://` URLs.

## Verification before launch

- Check both languages and a mobile-width screen.
- Add a real project and confirm translated content, stack, and links.
- Remove that entry to confirm the empty state.
- Temporarily use invalid JSON to confirm the error/retry state, then restore valid JSON before committing.
- Navigate with Tab and confirm visible focus and the skip link.
- On Cloudflare Pages, inspect response headers to confirm `_headers` applied.

Phase 2 remains paused until explicitly authorized. This frontend cannot keep any repository credential secret; future private repository writes must be handled by a separately secured server.

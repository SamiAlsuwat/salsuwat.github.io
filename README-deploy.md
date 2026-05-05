# Deploying the Database Course alongside your portfolio

This package adds a React-based **Introduction to Database** course to your existing `salsuwat.github.io` repo **without touching your portfolio**. The course will be served at:

```
https://samialsuwat.github.io/salsuwat.github.io/db-fundamental-labs/
```

Your existing pages (`index.html`, `teaching.html`, `bio.html`, `contact.html`) keep working unchanged at the same URLs they have today.

---

## What's in this package

```
.
├── .github/workflows/deploy.yml   ← GitHub Actions: builds course + publishes
└── course-source/                 ← React + Vite source for the course
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── … (all course files)
```

---

## How to install (one time, ~5 minutes)

### Step 1 — Add these files to your repo

In your local clone of `samialsuwat/salsuwat.github.io`:

1. Copy `.github/` and `course-source/` from this package into the **root** of the repo, alongside your existing `index.html`, `teaching.html`, etc.
2. Commit and push to `main`:

```bash
git add .github course-source
git commit -m "Add database course (built and deployed via GitHub Actions)"
git push origin main
```

### Step 2 — Switch GitHub Pages to "GitHub Actions" as the source

This is required because the workflow publishes via Actions instead of from a branch.

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, change it to **GitHub Actions**
3. Save (the change is automatic, no save button needed in most layouts)

### Step 3 — Wait for the first build

After pushing, go to the **Actions** tab in your repo. You'll see a workflow run called *"Deploy site (portfolio + course)"*. It takes about 2 minutes. When it finishes (green check), the site is live.

### Step 4 — Visit it

- Portfolio (unchanged): https://samialsuwat.github.io/salsuwat.github.io/
- Course: https://samialsuwat.github.io/salsuwat.github.io/db-fundamental-labs/

That's it. Every future push to `main` redeploys both automatically.

---

## Linking to the course from your portfolio

If you want a button on your existing pages, drop this anywhere into your portfolio HTML:

```html
<a href="db-fundamental-labs/">Introduction to Database Course</a>
```

The trailing slash matters — that's how the subfolder index gets served.

---

## How the workflow works (for reference)

The Actions workflow does this on every push:

1. Checks out the repo
2. Inside `course-source/`, runs `npm install` then `npm run build` — produces a static site in `course-source/dist/`
3. Builds a `_site/` folder containing:
   - All your portfolio files (everything at the repo root, minus `course-source/`, `.github/`, `_site/`, `.git/`)
   - The built course at `_site/db-fundamental-labs/`
4. Uploads `_site/` to GitHub Pages

Your portfolio sources are never modified.

---

## Editing the course later

To change course content (the 12 weekly lessons, quizzes, etc.):

1. Edit files inside `course-source/src/`
2. Commit + push → GitHub rebuilds and redeploys

To work on it locally before pushing:

```bash
cd course-source
npm install
npm run dev
```

Opens at http://localhost:5173.

---

## Admin login

- Username: `admin`
- Password: `Saad@1234`

This unlocks the admin dashboard which reads all student records from Supabase.

---

## Supabase

The Supabase project (URL and public anon key) is preconfigured in `course-source/src/supabaseClient.js`. Make sure **Row Level Security** is enabled on the `students` table in Supabase, since the anon key is exposed to the browser (this is normal and safe with RLS on).

---

## Troubleshooting

**The Actions tab shows the workflow failing.**
Click into the run, expand the failed step, and copy the error. The most common cause is that **GitHub Pages isn't set to "GitHub Actions" as the source** — go fix Step 2 above.

**The portfolio looks broken after deploying.**
This shouldn't happen — the workflow doesn't touch your portfolio files. If it does, restore by reverting the deploy commit. Your portfolio files in the repo are untouched, so a `git revert` will return everything to how it was.

**The course shows a blank page or 404s on assets.**
Check that `course-source/vite.config.js` still has `base: './'`. That's what makes the relative paths work at any subfolder.

---

Prepared by: Sami Alsuwat · سامي السواط

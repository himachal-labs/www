# GitHub Pages Publishing Procedure

## Overview

GitHub Pages allows you to publish documentation and websites directly from your GitHub repositories. This guide covers setup and publishing procedures for your GitHub Enterprise organization.

## Repository Setup

### Enable GitHub Pages

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section in left sidebar

2. **Configure Source**
   - Source: "Deploy from a branch"
   - Branch: `main` or `gh-pages`
   - Folder: `/ (root)` or `/docs`

3. **Custom Domain (Optional)**
   - Add your custom domain in "Custom domain" field
   - Create CNAME file in repository root with domain name

### Repository Structure

```
repository/
├── docs/                 # Documentation folder
│   ├── index.md         # Homepage
│   ├── _config.yml      # Jekyll configuration
│   └── pages/           # Additional pages
├── .github/
│   └── workflows/       # GitHub Actions (optional)
└── README.md           # Repository documentation
```

## Jekyll Configuration

### Basic _config.yml

```yaml
title: Organization Documentation
description: Internal documentation and procedures
baseurl: "/www"
url: "https://himachal-labs.github.io"

markdown: kramdown
highlighter: rouge
theme: minima

plugins:
  - jekyll-feed
  - jekyll-sitemap

exclude:
  - README.md
  - LICENSE
  - .gitignore
```

### Theme Selection

**Built-in Themes:**
- `minima` - Clean, minimal design
- `architect` - Project-focused layout
- `cayman` - Modern, responsive design
- `slate` - Dark theme for technical docs

**Custom Themes:**
- Fork existing theme repository
- Modify layouts and styles
- Reference in `_config.yml` as `remote_theme: username/theme-name`

## Content Organization

### Page Structure

```markdown
---
layout: default
title: Page Title
permalink: /page-url/
---

# Page Title

Content goes here...
```

### Navigation

Create `_data/navigation.yml`:

```yaml
main:
  - title: "Home"
    url: /
  - title: "Documentation"
    url: /docs/
  - title: "Procedures"
    url: /procedures/
```

## Publishing Workflow

### Manual Publishing

1. **Create Content**
   - Write markdown files in `docs/` folder
   - Add front matter to each page
   - Update navigation as needed

2. **Commit and Push**
   ```bash
   git add docs/
   git commit -m "Update documentation"
   git push origin main
   ```

3. **Verify Publication**
   - Check Actions tab for build status
   - Visit `https://himachal-labs.github.io/www`
   - Verify all links and formatting

### Automated Publishing with GitHub Actions

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
    paths: [ 'docs/**' ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v3
      - uses: actions/jekyll-build-pages@v1
        with:
          source: ./docs
          destination: ./_site
      - uses: actions/upload-pages-artifact@v2

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

## Content Management

### Documentation Standards

1. **File Naming**
   - Use lowercase with hyphens: `team-procedures.md`
   - Include date for time-sensitive docs: `2024-01-15-release-notes.md`

2. **Content Structure**
   - Start with clear title and description
   - Use consistent heading hierarchy
   - Include table of contents for long documents
   - Add last updated date

3. **Cross-References**
   - Use relative links: `[procedures](./procedures.md)`
   - Link to specific sections: `[setup](#repository-setup)`
   - Maintain link inventory for large sites

### Version Control

1. **Branch Strategy**
   - Use feature branches for major documentation updates
   - Review changes via pull requests
   - Merge to main for immediate publication

2. **Review Process**
   - Assign reviewers for accuracy
   - Check links and formatting in preview
   - Verify mobile responsiveness

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Jekyll syntax in `_config.yml`
- Verify front matter formatting
- Review Actions logs for specific errors

**Broken Links:**
- Use relative paths for internal links
- Verify file names and extensions
- Check case sensitivity

**Theme Issues:**
- Verify theme compatibility with GitHub Pages
- Check theme documentation for required plugins
- Test locally with `bundle exec jekyll serve`

### Local Development

```bash
# Install dependencies
gem install bundler jekyll

# Create Gemfile
echo "source 'https://rubygems.org'" > Gemfile
echo "gem 'github-pages', group: :jekyll_plugins" >> Gemfile

# Install and serve
bundle install
bundle exec jekyll serve --source docs
```

## Security Considerations

### Access Control
- Private repositories: Pages accessible only to organization members
- Public repositories: Pages publicly accessible
- Use organization-level settings to control visibility

### Content Review
- Avoid sensitive information in public pages
- Review commit history for accidental data exposure
- Use `.gitignore` for private configuration files

---

*For technical support, refer to GitHub Pages documentation or contact repository administrators.*
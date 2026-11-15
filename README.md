# Alhaura Rahmatunnisa Harsanto, Portfolio

Next.js 15, React 19, TypeScript, Tailwind CSS 3, Framer Motion, Lucide React.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

Fonts (Gloock and Schibsted Grotesk) load through `next/font/google`, so the first build needs internet access.

## Updating content

All content lives in `src/data/`, so components rarely need to change.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, roles, intro, about text, contact form email, LinkedIn and GitHub URLs |
| `experience.ts` | Experience & organizations (optional `location` per entry) |
| `projects.ts` | Add projects here. The placeholder swaps to a project grid automatically. Set `projectsUrl` for the "View Projects" button |
| `achievements.ts` | Awards and workshops |
| `skills.ts` | Skill groups and strengths |
| `education.ts` | Education |

LinkedIn and GitHub URLs are in `profile.ts` (`socials`). An empty value shows as "link coming soon".

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) and forwards messages to the email in `profile.ts`. The first message ever sent triggers a one-time activation email to that inbox: click the confirm link in it, then every later message arrives normally. Check spam if it does not show up.

## Palette

mist `#DCE3E8`, sand `#B3A394`, ash `#6A6969`, slate `#314352`, pine `#081710` (see `tailwind.config.ts`).

# Sanity CMS Setup Guide

Your portfolio now has a powerful CMS! Follow these steps to get started.

## 🚀 Quick Start

### Step 1: Get Your Sanity Project Details

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy your **Project ID**

### Step 2: Configure Environment Variables

1. Create a `.env` file in the project root:
```bash
cp env.template .env
```

2. Edit `.env` and add your Project ID:
```
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
```

### Step 3: Update Sanity Config

Open `sanity.config.ts` and replace `YOUR_PROJECT_ID` with your actual Project ID:
```typescript
projectId: 'abc123xyz', // Your actual project ID
```

### Step 4: Deploy Sanity Studio

Run this command to deploy your CMS dashboard:
```bash
npm run studio:deploy
```

This creates a hosted CMS at: `https://your-project.sanity.studio`

### Step 5: Start Adding Content!

Visit your Sanity Studio URL and you'll see three content types:

#### 📂 **Portfolio Project**
- Upload project images
- Add titles, categories, descriptions
- Reorder projects using the "Order" field

#### 🎬 **AI Film Lab Video**
- Upload video files or add video URLs
- Set platform (Runway, Veo, Sora, etc.)
- Add thumbnails
- Reorder videos

#### 🎨 **Visual Generation Lab Image**
- Upload generated images
- Set platform (Midjourney, DALL·E, etc.)
- Mark 3D models (for Meshy)
- Add generation prompts
- Reorder images

## 🛠️ Development Commands

### Run Sanity Studio Locally
```bash
npm run studio
```
Opens at `http://localhost:3333`

### Run Both Portfolio + Studio
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run studio
```

## 📝 How It Works

### Content Flow
```
Sanity Studio (CMS) 
    ↓
Add/Edit Content
    ↓
React App Fetches Data
    ↓
Displays on Website
```

### Data Fetching

Your React components will fetch from Sanity automatically:

```typescript
import { getPortfolioProjects, urlFor } from './lib/sanity';

// Fetch projects
const projects = await getPortfolioProjects();

// Generate image URLs
const imageUrl = urlFor(project.image).width(800).url();
```

## 🎯 Next Steps

1. **Deploy Studio**: Run `npm run studio:deploy`
2. **Get Project ID**: From sanity.io/manage
3. **Update Config**: Add Project ID to `sanity.config.ts` and `.env`
4. **Add Content**: Visit your Studio URL
5. **See It Live**: Your React app will show the content!

## 🔒 Security Notes

- **Never commit `.env`** - it's in `.gitignore`
- Your Project ID is public (safe to share)
- API tokens should never be committed

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Image URLs](https://www.sanity.io/docs/image-url)
- [GROQ Queries](https://www.sanity.io/docs/groq)

## 🆘 Need Help?

Common issues:

**"Cannot find projectId"**
→ Add your Project ID to `sanity.config.ts`

**"CORS error"**
→ Add your domain at sanity.io/manage → API → CORS Origins

**"No content showing"**
→ Make sure you've added content in Sanity Studio first!

---

You're all set! 🎉 Start adding your amazing work to the CMS.


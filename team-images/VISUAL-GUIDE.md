```
📦 Solar System Explorer Project
│
├── 📁 team-images/                          ← ALL TEAM PHOTOS GO HERE
│   ├── 📄 README.md                         ← Full documentation
│   ├── 📄 QUICK-UPDATE-GUIDE.md             ← Quick reference
│   ├── 📄 PLACEHOLDERS.md                   ← Image checklist
│   │
│   └── 🖼️ Images (Add these):
│       ├── founder-1.jpg                    ← Aarush Singh
│       ├── founder-2.jpg                    ← Mahim Gupta
│       ├── founder-3.jpg                    ← Shashwat Shukla
│       ├── mentor-1.jpg
│       ├── mentor-2.jpg
│       ├── mentor-3.jpg
│       ├── support-1.jpg                    ← Mr Vipul Kumar
│       ├── core-1.jpg
│       ├── core-2.jpg
│       ├── core-3.jpg
│       ├── graphics-1.jpg
│       ├── graphics-2.jpg
│       ├── graphics-3.jpg
│       ├── graphics-4.jpg
│       ├── management-1.jpg
│       ├── management-2.jpg
│       ├── member-year1-1.jpg
│       ├── member-year1-2.jpg
│       ├── member-year1-3.jpg
│       ├── member-year2-1.jpg
│       ├── member-year2-2.jpg
│       ├── member-year2-3.jpg
│       ├── member-year2-4.jpg
│       ├── member-year3-1.jpg
│       ├── member-year3-2.jpg
│       ├── member-year3-3.jpg
│       ├── member-year4-1.jpg
│       ├── member-year4-2.jpg
│       └── placeholder.jpg                  ← Optional fallback
│
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 teamImages.ts                 ← CONFIGURATION FILE
│   │                                        ← Update filenames here
│   │
│   └── 📁 pages/
│       └── 📄 Team.tsx                      ← TEAM PAGE COMPONENT
│                                            ← Add/remove team members here
│
└── 📄 TEAM-IMAGES-SETUP.md                  ← THIS DOCUMENTATION
```

---

## 🔄 How It All Works Together

```
┌─────────────────────────────────────────────────────────────┐
│                     TEAM IMAGE WORKFLOW                     │
└─────────────────────────────────────────────────────────────┘

1. IMAGES FOLDER (/team-images/)
   │
   │  Store all team photos here
   │  Example: founder-1.jpg
   │
   ├──▶ 2. CONFIGURATION (src/config/teamImages.ts)
   │      │
   │      │  Define which image files to use
   │      │  Example: FOUNDER_IMAGES.founder1 = 'founder-1.jpg'
   │      │
   │      ├──▶ 3. TEAM COMPONENT (src/pages/Team.tsx)
   │            │
   │            │  Use images in team member data
   │            │  Example: image: getImagePath(FOUNDER_IMAGES.founder1)
   │            │
   │            ├──▶ 4. WEBSITE DISPLAY
   │                  │
   │                  │  Team page shows all profiles with images
   │                  └──▶ ✨ Beautiful team profiles!
```

---

## 📝 Quick Examples

### Example 1: Update Existing Photo (EASY)
```
Step 1: Prepare image → founder-1.jpg (400x400px)
         ↓
Step 2: Copy to → /team-images/founder-1.jpg (replace old file)
         ↓
Step 3: Refresh browser → Done! ✅
```

### Example 2: Change Filename for Existing Member
```
Step 1: Add new image → /team-images/aarush-profile.jpg
         ↓
Step 2: Edit teamImages.ts →
        FOUNDER_IMAGES.founder1 = 'aarush-profile.jpg'
         ↓
Step 3: Refresh browser → Done! ✅
```

### Example 3: Add New Team Member
```
Step 1: Add image → /team-images/founder-4.jpg
         ↓
Step 2: Edit teamImages.ts →
        FOUNDER_IMAGES.founder4 = 'founder-4.jpg'
         ↓
Step 3: Edit Team.tsx →
        Add new founder to founders array
         ↓
Step 4: Refresh browser → Done! ✅
```

---

## 🎯 Key Files Summary

| File | What It Does | When to Edit |
|------|-------------|--------------|
| `/team-images/*.jpg` | **Stores** actual photos | When updating photos |
| `src/config/teamImages.ts` | **Maps** filenames to constants | When changing filenames |
| `src/pages/Team.tsx` | **Displays** team members | When adding/removing members |

---

## 🚀 Your Next Action

**To see your team profiles:**

1. Open terminal (where `npm run dev` is running)
2. Navigate to: `http://localhost:5173/team`
3. View the team page!

**To add real photos:**

1. Collect team member photos (square, 400x400px)
2. Name them correctly (see naming convention above)
3. Drop them into `/team-images/` folder
4. Refresh the team page to see them!

---

## 💡 Remember

✅ **Easy Mode**: Just replace the file with the same name
✅ **Advanced Mode**: Update `teamImages.ts` for custom filenames
✅ **Add Members**: Edit both `teamImages.ts` AND `Team.tsx`

---

**Happy Team Building! 🎉**

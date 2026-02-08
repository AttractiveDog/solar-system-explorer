# 🔧 Quick Update Guide for Team Images

## For Non-Technical Users

### ⚡ Quick Method (No Code Changes Required)

**To update any team member's photo:**

1. **Prepare your image:**
   - Make it square (same width and height)
   - Recommended: 400x400 pixels
   - Keep file size under 500KB
   - Save as: `.jpg`, `.png`, or `.webp`

2. **Find the right filename:**
   - Founders: `founder-1.jpg`, `founder-2.jpg`, `founder-3.jpg`
   - Mentors: `mentor-1.jpg`, `mentor-2.jpg`, `mentor-3.jpg`
   - College Support: `support-1.jpg`
   - Core Team: `core-1.jpg`, `core-2.jpg`, `core-3.jpg`
   - Graphics Team: `graphics-1.jpg` to `graphics-4.jpg`
   - Management: `management-1.jpg`, `management-2.jpg`
   - Members: `member-year1-1.jpg`, `member-year2-1.jpg`, etc.

3. **Replace the file:**
   - Navigate to: `/team-images/` folder
   - Replace the existing image with your new one
   - **Use the EXACT same filename**
   - Done! Refresh your browser to see changes

### Example: Updating Founder Image

```
Current file: /team-images/founder-1.jpg (Aarush Singh)

To update:
1. Rename your new photo to: founder-1.jpg
2. Copy it to /team-images/ folder
3. Confirm replacement when prompted
4. Refresh website ✅
```

## For Developers

### 📝 Image Configuration File

All image paths are centralized in:
```
src/config/teamImages.ts
```

### Update with Different Filename

1. Add new image to `/team-images/` folder
2. Edit `src/config/teamImages.ts`:

```typescript
export const FOUNDER_IMAGES = {
  founder1: 'aarush-new-photo.jpg',  // ← Change this
  founder2: 'founder-2.jpg',
  founder3: 'founder-3.jpg',
};
```

3. Save - changes apply automatically

### Add New Team Member

1. Add image to `/team-images/` (e.g., `founder-4.jpg`)
2. Update `teamImages.ts`:

```typescript
export const FOUNDER_IMAGES = {
  founder1: 'founder-1.jpg',
  founder2: 'founder-2.jpg',
  founder3: 'founder-3.jpg',
  founder4: 'founder-4.jpg',  // ← Add this
};
```

3. Update `Team.tsx`:

```typescript
const founders: TeamMember[] = [
  // ... existing members
  {
    id: 'f4',
    name: 'New Founder',
    role: 'Co-Founder',
    image: getImagePath(FOUNDER_IMAGES.founder4),  // ← Add this
    branch: 'Engineering',
    year: 'Final Year'
  }
];
```

## 📊 Current Team Member Count

- **Founders**: 3 members
- **Mentors**: 3 members
- **College Support**: 1 member
- **Core Team**: 3 members
- **Graphics Team**: 4 members
- **Management Team**: 2 members
- **Members**:
  - 1st Year: 3 members
  - 2nd Year: 4 members
  - 3rd Year: 3 members
  - 4th Year: 2 members

**Total**: 28 team members

## 🎯 Image Optimization Tools

- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/ (Mac)

## ✅ Checklist Before Uploading

- [ ] Image is square (1:1 ratio)
- [ ] Size is at least 200x200px
- [ ] File size is under 500KB
- [ ] Filename matches the naming convention
- [ ] Image is clear and professional
- [ ] Face is centered and visible

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Image not showing | Check filename spelling matches exactly |
| Image looks blurry | Use higher resolution (min 400x400px) |
| Image stretched | Make sure image is square |
| Changes not visible | Clear browser cache (Ctrl+Shift+R) |
| File too large | Compress using TinyPNG or similar |

## 💡 Pro Tips

1. **Batch rename**: Use a tool like Bulk Rename Utility for multiple images
2. **Consistent style**: Try to maintain similar lighting and background across photos
3. **Version control**: Keep original high-res images in a separate backup folder
4. **Test locally**: Always check the image displays correctly before deploying

---

**Need Help?** Contact the development team or refer to `/team-images/README.md` for detailed documentation.

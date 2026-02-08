# Team Images Folder

This folder contains all team member profile images for the Solar System Explorer project.

## 📁 Folder Structure

```
/team-images/
├── founder-1.jpg          # Aarush Singh (Founder)
├── founder-2.jpg          # Mahim Gupta (Co-Founder)
├── founder-3.jpg          # Shashwat Shukla (Co-Founder)
├── mentor-1.jpg           # Mentor 1
├── mentor-2.jpg           # Mentor 2
├── mentor-3.jpg           # Mentor 3
├── support-1.jpg          # Mr Vipul Kumar (TSC Convener)
├── core-1.jpg             # Core Team Member 1
├── core-2.jpg             # Core Team Member 2
├── core-3.jpg             # Core Team Member 3
├── graphics-1.jpg         # Graphics Team Member 1
├── graphics-2.jpg         # Graphics Team Member 2
├── graphics-3.jpg         # Graphics Team Member 3
├── graphics-4.jpg         # Graphics Team Member 4
├── management-1.jpg       # Management Team Member 1
├── management-2.jpg       # Management Team Member 2
├── member-year1-1.jpg     # 1st Year Member 1
├── member-year1-2.jpg     # 1st Year Member 2
├── member-year1-3.jpg     # 1st Year Member 3
├── member-year2-1.jpg     # 2nd Year Member 1
├── member-year2-2.jpg     # 2nd Year Member 2
├── member-year2-3.jpg     # 2nd Year Member 3
├── member-year2-4.jpg     # 2nd Year Member 4
├── member-year3-1.jpg     # 3rd Year Member 1
├── member-year3-2.jpg     # 3rd Year Member 2
├── member-year3-3.jpg     # 3rd Year Member 3
├── member-year4-1.jpg     # 4th Year Member 1
├── member-year4-2.jpg     # 4th Year Member 2
└── placeholder.jpg        # Default placeholder image
```

## 🖼️ Image Specifications

- **Recommended Size**: 400x400px (1:1 aspect ratio)
- **Minimum Size**: 200x200px
- **Maximum File Size**: 500KB
- **Supported Formats**: .jpg, .jpeg, .png, .webp
- **Image Quality**: High-resolution, well-lit, professional photos

## 🔄 How to Update Team Member Images

### Method 1: Replace Existing Image (Easiest)
1. Navigate to the `/team-images/` folder
2. Replace the existing image file with your new image
3. **Keep the same filename** (e.g., `founder-1.jpg`)
4. The website will automatically use the new image

### Method 2: Update with New Filename
1. Add your new image to `/team-images/`
2. Open `src/config/teamImages.ts`
3. Find the corresponding constant (e.g., `FOUNDER_IMAGES`)
4. Update the filename:
   ```typescript
   export const FOUNDER_IMAGES = {
     founder1: 'new-image-name.jpg',  // Update this line
     founder2: 'founder-2.jpg',
     founder3: 'founder-3.jpg',
   };
   ```
5. Save the file and the website will automatically update

## 📝 Naming Conventions

### Founders
- `founder-{number}.jpg` (e.g., `founder-1.jpg`, `founder-2.jpg`)

### Mentors
- `mentor-{number}.jpg` (e.g., `mentor-1.jpg`, `mentor-2.jpg`)

### College Support
- `support-{number}.jpg` (e.g., `support-1.jpg`)

### Core Team
- `core-{number}.jpg` (e.g., `core-1.jpg`, `core-2.jpg`)

### Graphics Team
- `graphics-{number}.jpg` (e.g., `graphics-1.jpg`, `graphics-2.jpg`)

### Management Team
- `management-{number}.jpg` (e.g., `management-1.jpg`, `management-2.jpg`)

### Members (by year)
- `member-year{year}-{number}.jpg` (e.g., `member-year1-1.jpg`, `member-year2-3.jpg`)

## 🎨 Image Optimization Tips

1. **Compress images** before uploading to improve website performance
   - Use tools like TinyPNG, ImageOptim, or Squoosh
2. **Crop to square** (1:1 aspect ratio) for best display
3. **Use consistent lighting** across all team photos
4. **Professional background** (solid color or blurred)
5. **Face should occupy 60-70%** of the image for better visibility

## 🚀 Quick Start Example

To update **Aarush Singh's** photo:
```bash
1. Save your new photo as 'founder-1.jpg'
2. Copy it to /team-images/ (replace existing file)
3. Refresh the website - Done! ✅
```

## 🔍 Troubleshooting

**Image not showing?**
- Check the filename spelling matches exactly
- Ensure the image is in the `/team-images/` folder (not a subfolder)
- Check file extension (.jpg, .jpeg, .png, .webp)
- Clear browser cache and refresh

**Image looks stretched or distorted?**
- Make sure the image is square (1:1 aspect ratio)
- Recommended: 400x400px

**Need help?**
Contact the development team or refer to `src/config/teamImages.ts` for the complete configuration.

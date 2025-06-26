# Category Setup Guide

## Adding New Categories to Sanity Studio

Follow these steps to add the required categories to your Sanity CMS:

### Method 1: Using Sanity Studio Interface

1. **Open your Sanity Studio**
   - Run `cd sanity && npm run dev` 
   - Navigate to `http://localhost:3333` (or your deployed studio URL)

2. **Navigate to Categories**
   - Click on "Categories" in the left sidebar

3. **Add each category manually**
   - Click "Create new Category"
   - Fill in the following details for each category:

#### Categories to Add:

**1. 25/26 SEASON**
- Name: `25/26 SEASON`
- Slug: `25-26-season` (auto-generated)
- Has Team Subcategories: ✅ **YES** (enable this)
- Teams/Subcategories: **Add all 20 Premier League teams** (see detailed list below)

**2. INTERNATIONAL JERSEYS**
- Name: `INTERNATIONAL JERSEYS`
- Slug: `international-jerseys` (auto-generated)
- Has Team Subcategories: ✅ **YES** (for country teams)
- Teams/Subcategories: (leave empty for now)

**3. VINTAGE JERSEYS**
- Name: `VINTAGE JERSEYS`
- Slug: `vintage-jerseys` (auto-generated)
- Has Team Subcategories: ❌ **NO**

**4. TRAINING JACKETS**
- Name: `TRAINING JACKETS`
- Slug: `training-jackets` (auto-generated)
- Has Team Subcategories: ❌ **NO**

**5. CRICKET JERSEYS**
- Name: `CRICKET JERSEYS`
- Slug: `cricket-jerseys` (auto-generated)
- Has Team Subcategories: ✅ **YES** (for cricket teams)
- Teams/Subcategories: (leave empty for now)

**6. BASKETBALL JERSEYS**
- Name: `BASKETBALL JERSEYS`
- Slug: `basketball-jerseys` (auto-generated)
- Has Team Subcategories: ✅ **YES** (for basketball teams)
- Teams/Subcategories: (leave empty for now)

#### Premier League Teams for 25/26 SEASON:

When adding the "25/26 SEASON" category, include these 20 teams as subcategories:

1. Arsenal
2. Aston Villa  
3. Bournemouth
4. Brentford
5. Brighton & Hove Albion
6. Burnley
7. Chelsea
8. Crystal Palace
9. Everton
10. Fulham
11. Leeds United
12. Liverpool
13. Manchester City
14. Manchester United
15. Newcastle United
16. Nottingham Forest
17. Sunderland
18. Tottenham
19. West Ham
20. Wolverhampton

### Method 2: Using GROQ Mutations (Advanced)

If you prefer to use the Vision tool in Sanity Studio:

1. Go to the Vision tool in your Sanity Studio
2. Use the following GROQ mutations (run each one separately):

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "25/26 SEASON",
      "slug": {"_type": "slug", "current": "25-26-season"},
      "hasTeams": true,
      "teams": [
        {"name": "Arsenal", "slug": {"_type": "slug", "current": "arsenal"}},
        {"name": "Aston Villa", "slug": {"_type": "slug", "current": "aston-villa"}},
        {"name": "Bournemouth", "slug": {"_type": "slug", "current": "bournemouth"}},
        {"name": "Brentford", "slug": {"_type": "slug", "current": "brentford"}},
        {"name": "Brighton & Hove Albion", "slug": {"_type": "slug", "current": "brighton-hove-albion"}},
        {"name": "Burnley", "slug": {"_type": "slug", "current": "burnley"}},
        {"name": "Chelsea", "slug": {"_type": "slug", "current": "chelsea"}},
        {"name": "Crystal Palace", "slug": {"_type": "slug", "current": "crystal-palace"}},
        {"name": "Everton", "slug": {"_type": "slug", "current": "everton"}},
        {"name": "Fulham", "slug": {"_type": "slug", "current": "fulham"}},
        {"name": "Leeds United", "slug": {"_type": "slug", "current": "leeds-united"}},
        {"name": "Liverpool", "slug": {"_type": "slug", "current": "liverpool"}},
        {"name": "Manchester City", "slug": {"_type": "slug", "current": "manchester-city"}},
        {"name": "Manchester United", "slug": {"_type": "slug", "current": "manchester-united"}},
        {"name": "Newcastle United", "slug": {"_type": "slug", "current": "newcastle-united"}},
        {"name": "Nottingham Forest", "slug": {"_type": "slug", "current": "nottingham-forest"}},
        {"name": "Sunderland", "slug": {"_type": "slug", "current": "sunderland"}},
        {"name": "Tottenham", "slug": {"_type": "slug", "current": "tottenham"}},
        {"name": "West Ham", "slug": {"_type": "slug", "current": "west-ham"}},
        {"name": "Wolverhampton", "slug": {"_type": "slug", "current": "wolverhampton"}}
      ]
    }
  }]
}
```

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "INTERNATIONAL JERSEYS",
      "slug": {"_type": "slug", "current": "international-jerseys"},
      "hasTeams": true,
      "teams": []
    }
  }]
}
```

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "VINTAGE JERSEYS",
      "slug": {"_type": "slug", "current": "vintage-jerseys"},
      "hasTeams": false,
      "teams": []
    }
  }]
}
```

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "TRAINING JACKETS",
      "slug": {"_type": "slug", "current": "training-jackets"},
      "hasTeams": false,
      "teams": []
    }
  }]
}
```

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "CRICKET JERSEYS",
      "slug": {"_type": "slug", "current": "cricket-jerseys"},
      "hasTeams": true,
      "teams": []
    }
  }]
}
```

```groq
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "BASKETBALL JERSEYS",
      "slug": {"_type": "slug", "current": "basketball-jerseys"},
      "hasTeams": true,
      "teams": []
    }
  }]
}
```

### After Adding Categories

1. **Verify the categories** by checking the debug page: `http://localhost:3000/debug`
2. **Add products** to these categories through the Sanity Studio
3. **Add teams/subcategories** later as needed for categories with `hasTeams: true`

### URL Structure After Adding

Once added, your categories will be accessible at:
- `/25-26-season`
- `/international-jerseys`
- `/vintage-jerseys`
- `/training-jackets`
- `/cricket-jerseys`
- `/basketball-jerseys`

For categories with teams enabled, you can also access:
- `/25-26-season/[team-name]`
- `/international-jerseys/[country-name]`
- `/cricket-jerseys/[team-name]`
- `/basketball-jerseys/[team-name]` 
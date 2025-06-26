// Script to add new categories to Sanity
// You can run this in your Sanity Studio's Vision tool or use it as reference

const categoriesToAdd = [
  {
    _type: 'category',
    name: '25/26 SEASON',
    slug: {
      _type: 'slug',
      current: '25-26-season'
    },
    hasTeams: true, // This category should have team subdivisions
    teams: [
      { name: 'Arsenal', slug: { _type: 'slug', current: 'arsenal' } },
      { name: 'Aston Villa', slug: { _type: 'slug', current: 'aston-villa' } },
      { name: 'Bournemouth', slug: { _type: 'slug', current: 'bournemouth' } },
      { name: 'Brentford', slug: { _type: 'slug', current: 'brentford' } },
      { name: 'Brighton & Hove Albion', slug: { _type: 'slug', current: 'brighton-hove-albion' } },
      { name: 'Burnley', slug: { _type: 'slug', current: 'burnley' } },
      { name: 'Chelsea', slug: { _type: 'slug', current: 'chelsea' } },
      { name: 'Crystal Palace', slug: { _type: 'slug', current: 'crystal-palace' } },
      { name: 'Everton', slug: { _type: 'slug', current: 'everton' } },
      { name: 'Fulham', slug: { _type: 'slug', current: 'fulham' } },
      { name: 'Leeds United', slug: { _type: 'slug', current: 'leeds-united' } },
      { name: 'Liverpool', slug: { _type: 'slug', current: 'liverpool' } },
      { name: 'Manchester City', slug: { _type: 'slug', current: 'manchester-city' } },
      { name: 'Manchester United', slug: { _type: 'slug', current: 'manchester-united' } },
      { name: 'Newcastle United', slug: { _type: 'slug', current: 'newcastle-united' } },
      { name: 'Nottingham Forest', slug: { _type: 'slug', current: 'nottingham-forest' } },
      { name: 'Sunderland', slug: { _type: 'slug', current: 'sunderland' } },
      { name: 'Tottenham', slug: { _type: 'slug', current: 'tottenham' } },
      { name: 'West Ham', slug: { _type: 'slug', current: 'west-ham' } },
      { name: 'Wolverhampton', slug: { _type: 'slug', current: 'wolverhampton' } }
    ]
  },
  {
    _type: 'category', 
    name: 'INTERNATIONAL JERSEYS',
    slug: {
      _type: 'slug',
      current: 'international-jerseys'
    },
    hasTeams: true, // This could have country teams
    teams: []
  },
  {
    _type: 'category',
    name: 'VINTAGE JERSEYS', 
    slug: {
      _type: 'slug',
      current: 'vintage-jerseys'
    },
    hasTeams: false,
    teams: []
  },
  {
    _type: 'category',
    name: 'TRAINING JACKETS',
    slug: {
      _type: 'slug', 
      current: 'training-jackets'
    },
    hasTeams: false,
    teams: []
  },
  {
    _type: 'category',
    name: 'CRICKET JERSEYS',
    slug: {
      _type: 'slug',
      current: 'cricket-jerseys'
    },
    hasTeams: true, // This could have cricket teams
    teams: []
  },
  {
    _type: 'category',
    name: 'BASKETBALL JERSEYS',
    slug: {
      _type: 'slug',
      current: 'basketball-jerseys'
    },
    hasTeams: true, // This could have basketball teams
    teams: []
  }
];

// To add these categories, you can:
// 1. Go to your Sanity Studio (localhost:3333 or your deployed studio)
// 2. Navigate to the Categories section
// 3. Click "Create new Category" for each category above
// 4. Fill in the fields according to the data structure above

// OR use the Vision tool with GROQ mutations:
// For each category, you can create them with:
/*
{
  "mutations": [{
    "create": {
      "_type": "category",
      "name": "25/26 SEASON",
      "slug": {
        "_type": "slug",
        "current": "25-26-season"
      },
      "hasTeams": true,
      "teams": []
    }
  }]
}
*/

console.log('Categories to add:', JSON.stringify(categoriesToAdd, null, 2));

export default categoriesToAdd; 
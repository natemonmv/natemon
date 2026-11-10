// Add a later day to `days` when it should appear. Leave published set to false until then.
window.CALL = {
  note: 'Schedule may change. Nate will let you know.',
  people: [
    { name: 'Marty', role: 'Photographer', phone: '650-207-4346', days: ['1111', '1223'] },
    { name: 'Fiel Jamil', role: 'Videographer', phone: '650-732-6223', days: ['1111', '1223'] },
    { name: 'Beatriz Orozco', role: 'Officiant and day-of coordinator', phone: '510.509.0966', days: ['1223'] },
    { name: 'Ilana Thomas', role: 'Violinist', phone: '925.784.9611', days: ['1223'] }
  ],
  days: [
    {
      id: '1111',
      published: true,
      label: 'Nov 11',
      title: 'Wednesday, November 11',
      shotlist: 'https://photos.app.goo.gl/sT26dAxFkwreMzkE8',
      places: [
        {
          name: 'Filoli Historic House & Garden',
          lines: ['86 Cañada Road', 'Woodside, CA 94062'],
          note: 'Doors open at 10:00 a.m.',
          maps: 'https://www.google.com/maps/search/?api=1&query=Filoli%20Historic%20House%20%26%20Garden%2086%20Canada%20Road%20Woodside'
        }
      ],
      timeline: [
        { time: '10:00 a.m.', text: 'Doors open', detail: 'Marty leads photography. Fiel covers video, with behind-the-scenes from Fiel.' },
        { time: '11:00 a.m.', text: 'Ceremony begins', detail: 'A short ceremony.' },
        { time: '11:11 a.m.', text: 'Pronouncement', detail: 'Pronouncement of marriage, then signing of the license. Photo coverage ends after the signing.' },
        { time: '12:00 p.m.', text: 'Video coverage ends', detail: '' }
      ]
    },
    {
      id: '1223',
      published: true,
      label: 'Dec 23',
      title: 'Wednesday, December 23',
      shotlist: 'https://photos.app.goo.gl/gyLNhim8HMSh25xN7',
      places: [
        {
          name: 'San Francisco City Hall',
          lines: ['1 Dr. Carlton B. Goodlett Place', 'Fourth Floor Balcony', 'San Francisco, CA 94102'],
          note: 'Ceremony and guest photos. Ilana plays here only.',
          maps: 'https://www.google.com/maps/search/?api=1&query=San%20Francisco%20City%20Hall%201%20Dr%20Carlton%20B%20Goodlett%20Pl'
        },
        {
          name: 'Epic Steak',
          lines: ['369 The Embarcadero', 'San Francisco, CA 94105'],
          note: 'Cocktail hour and lunch. No valet parking.',
          maps: 'https://www.google.com/maps/search/?api=1&query=Epic%20Steak%20369%20The%20Embarcadero%20San%20Francisco'
        }
      ],
      timeline: [
        { time: '9:00 a.m.', text: 'Photo and video begin', detail: 'Or 10:00 a.m. The start time is still tentative.' },
        { time: '10:45 a.m.', text: 'Ceremony begins', detail: 'Fourth Floor Balcony. The full ceremony is still being planned with Beatriz.' },
        { time: '12:15 p.m.', text: 'Photos end', detail: 'Photos with guests until then, then leave City Hall.' },
        { time: '12:30 p.m.', text: 'Arrive at Epic Steak', detail: 'Photo and video on arrival.' },
        { time: '1:00 p.m.', text: 'Cocktail hour', detail: 'Hors d’oeuvres until 2:00 p.m.' },
        { time: '2:00 p.m.', text: 'Lunch', detail: 'Until 4:00 p.m. Three courses, dessert, and cake cutting.' },
        { time: '4:00 p.m.', text: 'Holiday bar', detail: 'Location is not booked yet.' }
      ]
    }
  ]
};
